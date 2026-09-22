declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string; error?: any }) => void;
          }) => {
            requestAccessToken: (options?: { prompt?: string }) => void;
          };
        };
      };
    };
  }
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
}

class GoogleDriveService {
  private accessToken: string | null = null;
  private tokenClient: any = null;

  public async getClientId(): Promise<string> {
    try {
      const res = await fetch('/api/auth/google/client_id');
      const data = await res.json();
      return data.clientId || '';
    } catch {
      return '';
    }
  }

  public async signIn(clientId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!window.google?.accounts?.oauth2) {
        return reject(new Error('Google Identity Services script is still loading. Please try again.'));
      }

      if (!clientId) {
        return reject(new Error('Google Client ID is not configured.'));
      }

      this.tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly',
        callback: (resp) => {
          if (resp.error) {
            reject(resp);
          } else if (resp.access_token) {
            this.accessToken = resp.access_token;
            resolve(resp.access_token);
          }
        },
      });

      this.tokenClient.requestAccessToken({ prompt: '' });
    });
  }

  public get isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  public async listPDFFiles(): Promise<DriveFile[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google Drive');
    }

    const q = "mimeType = 'application/pdf' and trashed = false";
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType,size,modifiedTime)&pageSize=25`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Failed to list files from Google Drive');
    }

    const data = await res.json();
    return data.files || [];
  }

  public async downloadFile(fileId: string, fileName: string): Promise<File> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google Drive');
    }

    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to download file from Google Drive');
    }

    const blob = await res.blob();
    return new File([blob], fileName, { type: 'application/pdf' });
  }

  public async uploadPDF(fileName: string, pdfBytes: Uint8Array): Promise<string> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google Drive');
    }

    const metadata = {
      name: fileName,
      mimeType: 'application/pdf',
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', new Blob([pdfBytes as any], { type: 'application/pdf' }));

    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: form,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Failed to upload file to Google Drive');
    }

    const data = await res.json();
    return data.id;
  }
}

export const driveService = new GoogleDriveService();
