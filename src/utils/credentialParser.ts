import { ParsedCredentials, FTPCredentials, WPAdminCredentials, SSHCredentials } from '../types/credentials';

const parseFTPSection = (content: string): FTPCredentials | null => {
    const ftpData: Partial<FTPCredentials> = {};
    const pairs = content.match(/(\w+:(?:sftp:\/\/)?[^,]+)/g) || [];

    pairs.forEach(pair => {
        const [key, value] = pair.split(/:(.+)/).map(s => s.trim());
        if (key && value) {
            ftpData[key as keyof FTPCredentials] = value;
        }
    });

    return Object.keys(ftpData).length === 5 ? ftpData as FTPCredentials : null;
};

const parseWPAdminSection = (content: string): WPAdminCredentials | null => {
    const wpData: Partial<WPAdminCredentials> = {};
    const pairs = content.match(/(\w+:\s*[^,\]]+)/g) || [];

    pairs.forEach(pair => {
        const [key, value] = pair.split(/:(.+)/).map(s => s.trim());
        if (key && value) {
            wpData[key.trim() as keyof WPAdminCredentials] = value.trim();
        }
    });

    return Object.keys(wpData).length === 2 ? wpData as WPAdminCredentials : null;
};

const parseSSHSection = (content: string): SSHCredentials | null => {
    const sshData: Partial<SSHCredentials> = {};
    const pairs = content.match(/(\w+:[^,]+)/g) || [];

    pairs.forEach(pair => {
        const [key, value] = pair.split(/:(.+)/).map(s => s.trim());
        if (key && value) {
            sshData[key as keyof SSHCredentials] = value;
        }
    });

    return Object.keys(sshData).length === 4 ? sshData as SSHCredentials : null;
};

export const parseCredentialString = (input: string): ParsedCredentials | null => {
    try {
        const sections = input.split(':::');
        const result: ParsedCredentials = {};

        sections.forEach(section => {
            const match = section.match(/^([^:[\]]+):\[(.*)\]$/);
            if (!match) return;

            const [, key, content] = match;

            switch (key) {
                case 'FTP':
                    const ftpResult = parseFTPSection(content);
                    if (ftpResult) result.FTP = ftpResult;
                    break;
                case 'WPAdmin':
                    const wpResult = parseWPAdminSection(content);
                    if (wpResult) result.WPAdmin = wpResult;
                    break;
                case 'SSH':
                    const sshResult = parseSSHSection(content);
                    if (sshResult) result.SSH = sshResult;
                    break;
            }
        });

        return Object.keys(result).length > 0 ? result : null;
    } catch (error) {
        console.error('Error parsing credential string:', error);
        return null;
    }
}