# Validate Markdown — checks for common issues after editing .md files
$jsonInput = [Console]::In.ReadToEnd()
$data = $jsonInput | ConvertFrom-Json

$toolName = $data.toolName
$toolInput = $data.toolInput

# Determine the edited file path
$filePath = $null
$editTools = @("replace_string_in_file", "create_file")
if ($editTools -contains $toolName) {
    $filePath = $toolInput.filePath
}
elseif ($toolName -eq "multi_replace_string_in_file" -and $toolInput.replacements) {
    $filePath = $toolInput.replacements[0].filePath
}

# Only validate .md files
if (-not $filePath -or $filePath -notmatch "\.md$") {
    exit 0
}

if (-not (Test-Path $filePath)) {
    exit 0
}

$content = Get-Content $filePath -Raw
$warnings = @()

# Check for unclosed code fences
$fenceCount = ([regex]::Matches($content, '(?m)^```')).Count
if ($fenceCount % 2 -ne 0) {
    $warnings += "Unclosed code fence detected (odd number of ``` delimiters: $fenceCount)"
}

# Check for unclosed :::prompt blocks
$promptOpens = ([regex]::Matches($content, '(?m)^:::prompt')).Count
$promptCloses = ([regex]::Matches($content, '(?m)^:::\s*$')).Count
if ($promptOpens -gt $promptCloses) {
    $warnings += "Possible unclosed :::prompt block ($promptOpens opens vs $promptCloses closes)"
}

# Check for malformed template variables (single braces instead of double)
$badVars = [regex]::Matches($content, '(?<!\{)\{[a-zA-Z]\w+\}(?!\})')
if ($badVars.Count -gt 0) {
    $examples = ($badVars | Select-Object -First 3 | ForEach-Object { $_.Value }) -join ", "
    $warnings += "Possible malformed template variable (use {{var}} not {var}): $examples"
}

if ($warnings.Count -gt 0) {
    $message = "Markdown validation warnings for $($filePath | Split-Path -Leaf):`n" + ($warnings -join "`n- ")
    $result = @{
        systemMessage = $message
    }
    $result | ConvertTo-Json -Depth 5
}
