$html = Get-Content -Raw -Encoding UTF8 'index.html'
Write-Host "Checking index.html..."
if ($html -match 'styles.css' -and $html -match 'slides-data.js' -and $html -match 'quiz-data.js' -and $html -match 'visualizer.js' -and $html -match 'app.js') {
    Write-Host "All assets linked correctly in index.html!"
} else {
    Write-Host "Warning: Missing asset reference in index.html"
}

# Check slide count in slides-data.js
$slidesJs = Get-Content -Raw -Encoding UTF8 'slides-data.js'
$matches = [regex]::Matches($slidesJs, 'id:\s*"([^"]+)"')
Write-Host "Slides count found: $($matches.Count)"
foreach ($m in $matches) {
    Write-Host " - $($m.Groups[1].Value)"
}

# Check quiz questions count
$quizJs = Get-Content -Raw -Encoding UTF8 'quiz-data.js'
$qMatches = [regex]::Matches($quizJs, 'id:\s*(\d+)')
Write-Host "Quiz questions count: $($qMatches.Count)"
