#!/bin/bash
# Gate Azure Deployments — requires user confirmation before deploy commands
input=$(cat)
tool_name=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('toolName',''))")
command_text=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('toolInput',{}).get('command',''))")

if [ "$tool_name" = "run_in_terminal" ]; then
    if echo "$command_text" | grep -qiE "(swa\s+deploy|az\s+staticwebapp|az\s+webapp)"; then
        cat <<'EOF'
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "ask",
    "permissionDecisionReason": "This command deploys to Azure production. Please confirm you want to proceed."
  }
}
EOF
        exit 0
    fi
fi

cat <<'EOF'
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow"
  }
}
EOF
