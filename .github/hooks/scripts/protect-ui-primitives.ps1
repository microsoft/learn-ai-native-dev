# Protect UI Primitives — warn before editing shadcn/ui components
$jsonInput = [Console]::In.ReadToEnd()
$data = $jsonInput | ConvertFrom-Json

$toolName = $data.toolName
$toolInput = $data.toolInput

# Check file-editing tools
$editTools = @("replace_string_in_file", "multi_replace_string_in_file", "create_file")
if ($editTools -contains $toolName) {
    $filePath = $toolInput.filePath
    if (-not $filePath -and $toolInput.replacements) {
        $filePath = $toolInput.replacements[0].filePath
    }

    if ($filePath -and $filePath -match "[/\\]src[/\\]components[/\\]ui[/\\]") {
        $result = @{
            hookSpecificOutput = @{
                hookEventName = "PreToolUse"
                permissionDecision = "ask"
                permissionDecisionReason = "This edits a shadcn/ui primitive in src/components/ui/. These should typically be regenerated, not hand-edited. Confirm?"
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
