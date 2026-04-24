#!/bin/bash
# Protect UI Primitives — warn before editing shadcn/ui components
input=$(cat)
tool_name=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('toolName',''))")

file_path=""
if [ "$tool_name" = "replace_string_in_file" ] || [ "$tool_name" = "create_file" ]; then
    file_path=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('toolInput',{}).get('filePath',''))")
elif [ "$tool_name" = "multi_replace_string_in_file" ]; then
    file_path=$(echo "$input" | python3 -c "import sys,json; r=json.load(sys.stdin).get('toolInput',{}).get('replacements',[]); print(r[0].get('filePath','') if r else '')")
fi

if echo "$file_path" | grep -qE "src/components/ui/|src\\\\components\\\\ui\\\\"; then
    cat <<'EOF'
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "ask",
    "permissionDecisionReason": "This edits a shadcn/ui primitive in src/components/ui/. These should typically be regenerated, not hand-edited. Confirm?"
  }
}
EOF
    exit 0
fi

cat <<'EOF'
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow"
  }
}
EOF
