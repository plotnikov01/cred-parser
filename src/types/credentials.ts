export interface FTPCredentials {
    fqdn: string;
    ip: string;
    ftpuser: string;
    ftppassword: string;
    ftpport: string;
}

export interface WPAdminCredentials {
    username: string;
    password: string;
}

export interface SSHCredentials {
    ip: string;
    sshuser: string;
    sshpassword: string;
    sshport: string;
}

export interface ParsedCredentials {
    FTP?: FTPCredentials;
    WPAdmin?: WPAdminCredentials;
    SSH?: SSHCredentials;
}