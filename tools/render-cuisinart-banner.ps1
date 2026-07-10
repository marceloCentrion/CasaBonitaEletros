Add-Type -AssemblyName System.Drawing

$sourcePath = 'C:\Users\Marcelo Zand\.codex\generated_images\019f4bf6-06b8-79c3-9841-2ab924493fe8\exec-08ef1c28-6e9f-4b2e-9d44-78df4faeee2b.png'
$logoPath = 'J:\Centrion\projetos\CasaBonitaEletros\public\banners\assets\cuisinart-logo-white-1200.png'
$outputDir = 'J:\Centrion\projetos\CasaBonitaEletros\public\banners'
$pngPath = Join-Path $outputDir 'cuisinart-arkton-ai-1920x580.png'
$jpgPath = Join-Path $outputDir 'cuisinart-arkton-ai-1920x580.jpg'

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$source = [System.Drawing.Image]::FromFile($sourcePath)
$logo = [System.Drawing.Image]::FromFile($logoPath)
$canvas = [System.Drawing.Bitmap]::new(
    1920,
    580,
    [System.Drawing.Imaging.PixelFormat]::Format24bppRgb
)
$canvas.SetResolution(96, 96)

$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$white = [System.Drawing.Color]::FromArgb(250, 250, 248)
$red = [System.Drawing.Color]::FromArgb(183, 0, 10)
$dark = [System.Drawing.Color]::FromArgb(20, 21, 22)
$accent = [System.Drawing.Color]::FromArgb(190, 0, 15)

$graphics.Clear([System.Drawing.Color]::FromArgb(235, 228, 219))

# Use only the clean kitchen/product area from the AI render. The blender is
# composited separately below so the source banner's old diagonal graphics do
# not leak into the new header.
$photoDestination = [System.Drawing.Rectangle]::new(820, 0, 1100, 580)
$graphics.DrawImage(
    $source,
    $photoDestination,
    [single]775,
    [single]220,
    [single]942,
    [single]497,
    [System.Drawing.GraphicsUnit]::Pixel
)

$redBrush = [System.Drawing.SolidBrush]::new($red)
$whiteBrush = [System.Drawing.SolidBrush]::new($white)
$whiteTextBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
$darkBrush = [System.Drawing.SolidBrush]::new($dark)
$accentBrush = [System.Drawing.SolidBrush]::new($accent)

$redPanel = [System.Drawing.Point[]]@(
    [System.Drawing.Point]::new(0, 0),
    [System.Drawing.Point]::new(880, 0),
    [System.Drawing.Point]::new(650, 190),
    [System.Drawing.Point]::new(0, 190)
)
$graphics.FillPolygon($redBrush, $redPanel)

$shinePen = [System.Drawing.Pen]::new(
    [System.Drawing.Color]::FromArgb(150, 255, 45, 55),
    3
)
$graphics.DrawLine($shinePen, 40, 0, 170, 190)
$graphics.DrawLine($shinePen, 52, 0, 182, 190)

$separator = [System.Drawing.Point[]]@(
    [System.Drawing.Point]::new(880, 0),
    [System.Drawing.Point]::new(900, 0),
    [System.Drawing.Point]::new(664, 192),
    [System.Drawing.Point]::new(649, 192)
)
$graphics.FillPolygon($whiteBrush, $separator)

$whitePanel = [System.Drawing.Point[]]@(
    [System.Drawing.Point]::new(0, 175),
    [System.Drawing.Point]::new(760, 175),
    [System.Drawing.Point]::new(690, 580),
    [System.Drawing.Point]::new(0, 580)
)
$graphics.FillPolygon($whiteBrush, $whitePanel)

$fontArkton = [System.Drawing.Font]::new('Arial', 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$fontTag = [System.Drawing.Font]::new('Arial', 17, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontHeadline = [System.Drawing.Font]::new('Arial', 43, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontBody = [System.Drawing.Font]::new('Arial', 18, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$fontBodyBold = [System.Drawing.Font]::new('Arial', 18, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontBenefit = [System.Drawing.Font]::new('Arial', 15, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

$logoDestination = [System.Drawing.Rectangle]::new(55, 38, 285, 67)
$graphics.DrawImage($logo, $logoDestination)
$graphics.DrawString('A R K T O N', $fontArkton, $whiteTextBrush, 60, 102)

$dividerPen = [System.Drawing.Pen]::new([System.Drawing.Color]::White, 2)
$graphics.DrawLine($dividerPen, 342, 45, 342, 130)

$tagline = "DESIGN QUE INSPIRA.`nDESEMPENHO`nQUE IMPRESSIONA."
$graphics.DrawString($tagline, $fontTag, $whiteTextBrush, 370, 48)

$graphics.DrawString('TECNOLOGIA', $fontHeadline, $darkBrush, 55, 215)
$graphics.DrawString('QUE TRANSFORMA', $fontHeadline, $accentBrush, 55, 266)
$graphics.DrawString('SUA COZINHA', $fontHeadline, $darkBrush, 55, 317)

$accentLinePen = [System.Drawing.Pen]::new($accent, 4)
$graphics.DrawLine($accentLinePen, 58, 374, 115, 374)

$graphics.DrawString('A linha', $fontBody, $darkBrush, 58, 395)
$graphics.DrawString('Cuisinart Arkton', $fontBodyBold, $accentBrush, 118, 395)
$graphics.DrawString('combina design sofisticado,', $fontBody, $darkBrush, 268, 395)
$innovation = 'inova' + [char]0x00E7 + [char]0x00E3 + 'o'
$graphics.DrawString("alta performance e $innovation para o seu dia a dia.", $fontBody, $darkBrush, 58, 421)

$iconPen = [System.Drawing.Pen]::new($accent, 4)
$circlePen = [System.Drawing.Pen]::new($accent, 3)

$graphics.DrawEllipse($circlePen, 58, 481, 44, 44)
$graphics.DrawLine($iconPen, 70, 503, 77, 510)
$graphics.DrawLine($iconPen, 77, 510, 91, 493)
$graphics.DrawString('DESIGN', $fontBenefit, $darkBrush, 115, 480)
$graphics.DrawString('SOFISTICADO', $fontBenefit, $darkBrush, 115, 500)

$graphics.DrawEllipse($circlePen, 245, 481, 44, 44)
$graphics.DrawArc($iconPen, 253, 490, 28, 28, 190, 160)
$graphics.DrawLine($iconPen, 267, 505, 277, 494)
$graphics.DrawString('ALTA', $fontBenefit, $darkBrush, 302, 480)
$graphics.DrawString('PERFORMANCE', $fontBenefit, $darkBrush, 302, 500)

$shield = [System.Drawing.Point[]]@(
    [System.Drawing.Point]::new(455, 481),
    [System.Drawing.Point]::new(478, 488),
    [System.Drawing.Point]::new(478, 510),
    [System.Drawing.Point]::new(455, 528),
    [System.Drawing.Point]::new(432, 510),
    [System.Drawing.Point]::new(432, 488)
)
$graphics.DrawPolygon($iconPen, $shield)
$graphics.DrawLine($iconPen, 444, 503, 451, 510)
$graphics.DrawLine($iconPen, 451, 510, 467, 493)
$graphics.DrawString('TECNOLOGIA', $fontBenefit, $darkBrush, 492, 480)
$graphics.DrawString('QUE DURA', $fontBenefit, $darkBrush, 492, 500)

# Composite the blender above the diagonal panels. A tight polygon removes the
# old source artwork around it while retaining the glass and stainless details.
$blenderDestination = [System.Drawing.Rectangle]::new(650, 65, 285, 510)
$blenderClip = [System.Drawing.Point[]]@(
    [System.Drawing.Point]::new(735, 82),
    [System.Drawing.Point]::new(860, 82),
    [System.Drawing.Point]::new(875, 88),
    [System.Drawing.Point]::new(902, 98),
    [System.Drawing.Point]::new(902, 320),
    [System.Drawing.Point]::new(880, 338),
    [System.Drawing.Point]::new(880, 400),
    [System.Drawing.Point]::new(865, 415),
    [System.Drawing.Point]::new(865, 565),
    [System.Drawing.Point]::new(680, 565),
    [System.Drawing.Point]::new(680, 415),
    [System.Drawing.Point]::new(662, 400),
    [System.Drawing.Point]::new(680, 338),
    [System.Drawing.Point]::new(680, 95),
    [System.Drawing.Point]::new(710, 90)
)
$blenderPath = [System.Drawing.Drawing2D.GraphicsPath]::new()
$blenderPath.AddPolygon($blenderClip)
$graphicsState = $graphics.Save()
$graphics.SetClip($blenderPath)
$graphics.DrawImage(
    $source,
    $blenderDestination,
    [single]570,
    [single]260,
    [single]220,
    [single]470,
    [System.Drawing.GraphicsUnit]::Pixel
)
$graphics.Restore($graphicsState)

$canvas.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object MimeType -eq 'image/jpeg'
$jpegQuality = [System.Drawing.Imaging.EncoderParameter]::new(
    [System.Drawing.Imaging.Encoder]::Quality,
    [long]98
)
$jpegParameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
$jpegParameters.Param[0] = $jpegQuality
$canvas.Save($jpgPath, $jpegCodec, $jpegParameters)

$disposables = @(
    $source,
    $logo,
    $graphics,
    $canvas,
    $redBrush,
    $whiteBrush,
    $whiteTextBrush,
    $darkBrush,
    $accentBrush,
    $shinePen,
    $dividerPen,
    $accentLinePen,
    $iconPen,
    $circlePen,
    $fontArkton,
    $fontTag,
    $fontHeadline,
    $fontBody,
    $fontBodyBold,
    $fontBenefit,
    $jpegQuality,
    $jpegParameters,
    $blenderPath
)
foreach ($item in $disposables) {
    if ($null -ne $item) {
        $item.Dispose()
    }
}

$check = [System.Drawing.Image]::FromFile($pngPath)
Write-Output ("PNG final: {0}x{1} | {2:N0} bytes" -f $check.Width, $check.Height, (Get-Item $pngPath).Length)
$check.Dispose()
Write-Output ("JPEG final: {0:N0} bytes" -f (Get-Item $jpgPath).Length)
