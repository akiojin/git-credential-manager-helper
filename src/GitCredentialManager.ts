import * as exec from '@actions/exec'
import { ExecOptions } from '@actions/exec'

export class GitCredentialManager
{
  /**
   * Setup git credential manager.
   * Install git-credential-manager-core with Homebrew.
   * 
   * Hobrew is required.
   * 
   * @returns Promise<void>
   */
  static async Setup(): Promise<void>
  {
    await exec.exec('brew', ['tap', 'microsoft/git'])
    await exec.exec('brew', ['install', '--cask', 'git-credential-manager-core'])
  }

  static async Configure(): Promise<number>
  {
    await this.Execute('configure')
    return exec.exec('git', ['config', '--global', 'credential.interactive', 'false'])
  }

  static Execute(command: string, options?: ExecOptions): Promise<number>
  {
    // https://github.com/GitCredentialManager/git-credential-manager/blob/main/docs/credstores.md#macos-keychain
    return exec.exec('git', ['credential-manager-core', command], options)
  }

  /**
   * Get git credentials
   * 
   * @returns Promise<string> Execution Result
   */
  static async Get(): Promise<string>
  {
    let output = ''
    const options: exec.ExecOptions = {
      input: Buffer.from(`protocol=https\nhost=github.com\n\n`),
      listeners: {
        stdout (data: Buffer) {
          output += data.toString()
        } 
      }
    }

    await this.Execute('get', options)
    return output
  }

  /**
   * Store git credentials
   * 
   * @param   username        User name.
   * @param   password        Password or Personal access token.
   * @returns Promise<string> Execution Result
   */
  static async Store(username: string, password: string): Promise<string>
  {
    let output = ''
    const options: exec.ExecOptions = {
      input: Buffer.from(`protocol=https\nhost=github.com\nusername=${username}\npassword=${password}\n\n`),
      listeners: {
        stdout (data: Buffer) {
          output += data.toString()
        } 
      }
    }

    await this.Execute('store', options)
    return output
  }

  /**
   * Erase git credentials
   * 
   * @returns Promise<number> exit code
   */
  static async Erase(): Promise<string>
  {
    let output = ''
    const options: exec.ExecOptions = {
      input: Buffer.from(`protocol=https\nhost=github.com\n\n`),
      listeners: {
        stdout (data: Buffer) {
          output += data.toString()
        }
      }
    }

    await this.Execute('erase', options)
    return output
  }
}
