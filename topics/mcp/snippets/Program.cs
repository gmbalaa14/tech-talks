// Minimal remote MCP server
using System.ComponentModel;
using ModelContextProtocol.Server;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMcpServer()
    .WithHttpTransport(o => o.Stateless = true)
    .WithToolsFromAssembly();

var app = builder.Build();
app.MapMcp("/mcp");
app.Run();

[McpServerToolType]
public static class WorkItemTools
{
    [McpServerTool, Description("Get a work item by id.")]
    public static WorkItem Get(int id)
        => new(id, "Fix login", "Active");
}

public record WorkItem(int Id, string Title, string State);
