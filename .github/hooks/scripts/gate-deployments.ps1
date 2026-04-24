# Gate Azure Deployments — requires user confirmation before deploy commands
$jsonInput = [Console]::In.ReadToEnd()
$data = $jsonInput | ConvertFrom-Json

$toolName = $data.toolName
$toolInput = $data.toolInput

if ($toolName -eq "run_in_terminal") {
    $command = $toolInput.command
    if ($command -match "(swa\s+deploy|az\s+staticwebapp|az\s+webapp)") {
        $result = @{
            hookSpecificOutput = @{
                hookEventName = "PreToolUse"
                permissionDecision = "ask"
                permissionDecisionReason = "This command deploys to Azure production. Please confirm you want to proceed."
            }
        }
        $result | ConvertTo-Json -Depth 5
        exit 0
    }
}

# Allow everything else
$result = @{
    hookSpecificOutput = @{
        hookEventName = "PreToolUse"
        permissionDecision = "allow"
    }
}
$result | ConvertTo-Json -Depth 5
