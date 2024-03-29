import { ExecOptions } from '@actions/exec';
export declare class GitCredentialManager {
    /**
     * Setup git credential manager.
     * Install git-credential-manager-core with Homebrew.
     *
     * Hobrew is required.
     *
     * @returns Promise<void>
     */
    static Setup(): Promise<void>;
    static Configure(): Promise<void>;
    static Execute(command: string, options?: ExecOptions): Promise<number>;
    /**
     * Get git credentials
     *
     * @returns Promise<string> Execution Result
     */
    static Get(): Promise<string>;
    /**
     * Store git credentials
     *
     * @param   username        User name.
     * @param   password        Password or Personal access token.
     * @returns Promise<string> Execution Result
     */
    static Store(username: string, password: string): Promise<string>;
    /**
     * Erase git credentials
     *
     * @returns Promise<number> exit code
     */
    static Erase(): Promise<string>;
}
