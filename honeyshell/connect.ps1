$ErrorActionPreference = 'Stop'
$client = [System.Net.Sockets.TcpClient]::new()

try {
    $client.Connect('127.0.0.1', 8023)
    $stream = $client.GetStream()
    $stream.ReadTimeout = 45000
    $buffer = [byte[]]::new(4096)
    $encoding = [System.Text.Encoding]::UTF8

    while ($true) {
        $response = [System.Text.StringBuilder]::new()
        $closed = $false
        while (-not $response.ToString().EndsWith('$ ')) {
            $count = $stream.Read($buffer, 0, $buffer.Length)
            if ($count -eq 0) {
                $closed = $true
                break
            }
            [void]$response.Append($encoding.GetString($buffer, 0, $count))
            if ($response.Length -gt 100000) { throw 'Shell response exceeded its size limit.' }
        }
        [Console]::Write($response.ToString())
        if ($closed) { break }
        $line = [Console]::ReadLine()
        if ($null -eq $line) { $line = 'exit' }
        $command = $encoding.GetBytes($line + "`n")
        $stream.Write($command, 0, $command.Length)
    }
}
finally {
    $client.Dispose()
}
