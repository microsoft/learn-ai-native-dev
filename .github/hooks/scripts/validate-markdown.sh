#!/bin/bash
# Validate Markdown — checks for common issues after editing .md files
input=$(cat)
tool_name=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('toolName',''))")

file_path=""
case "$tool_name" in
    replace_string_in_file|create_file)
        file_path=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('toolInput',{}).get('filePath',''))")
        ;;
    multi_replace_string_in_file)
        file_path=$(echo "$input" | python3 -c "import sys,json; r=json.load(sys.stdin).get('toolInput',{}).get('replacements',[]); print(r[0].get('filePath','') if r else '')")
        ;;
esac

# Only validate .md files
if [[ ! "$file_path" =~ \.md$ ]] || [ ! -f "$file_path" ]; then
    exit 0
fi

warnings=""

# Check for unclosed code fences
fence_count=$(grep -cE '^\`\`\`' "$file_path" || true)
if (( fence_count % 2 != 0 )); then
    warnings="${warnings}\n- Unclosed code fence detected (odd number of \`\`\` delimiters: $fence_count)"
fi

# Check for unclosed :::prompt blocks
prompt_opens=$(grep -cE '^:::prompt' "$file_path" || true)
prompt_closes=$(grep -cE '^:::\s*$' "$file_path" || true)
if (( prompt_opens > prompt_closes )); then
    warnings="${warnings}\n- Possible unclosed :::prompt block ($prompt_opens opens vs $prompt_closes closes)"
fi

if [ -n "$warnings" ]; then
    filename=$(basename "$file_path")
    message="Markdown validation warnings for ${filename}:${warnings}"
    python3 -c "import json,sys; print(json.dumps({'systemMessage': sys.argv[1]}))" "$message"
fi
