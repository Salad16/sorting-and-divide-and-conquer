$lines = Get-Content -Path "C:\Users\alicf\.gemini\antigravity\scratch\cs05-chapter-05\index.html"
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'class="formula') {
        Write-Output ("Line " + ($i + 1) + ": " + $lines[$i])
        for ($j = 1; $j -le 5; $j++) {
            if ($i + $j -lt $lines.Count) {
                Write-Output ("   " + $lines[$i + $j])
                if ($lines[$i + $j] -match '</div>') { break }
            }
        }
    }
}
