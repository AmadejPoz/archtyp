import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export class MCPClient {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;

  async connect(serverPath: string, args: string[] = []) {
    this.transport = new StdioClientTransport({
      command: serverPath,
      args,
    });

    this.client = new Client(
      {
        name: "archtyp-client",
        version: "1.0.0",
      },
      {
        capabilities: {},
      }
    );

    await this.client.connect(this.transport);
    return this.client;
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.transport = null;
    }
  }

  getClient() {
    return this.client;
  }
}
