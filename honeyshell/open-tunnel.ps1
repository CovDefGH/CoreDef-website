$ErrorActionPreference = 'Stop'

$sourceKey = 'C:\Users\rishi\Downloads\SSH Core Def Dec.pem'
$temporaryKey = Join-Path $env:TEMP ("coredef-shell-$PID.pem")
$account = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name

try {
    Copy-Item -LiteralPath $sourceKey -Destination $temporaryKey
    $acl = Get-Acl -LiteralPath $temporaryKey
    $acl.SetAccessRuleProtection($true, $false)
    $acl.AddAccessRule([System.Security.AccessControl.FileSystemAccessRule]::new($account, 'Read', 'Allow'))
    Set-Acl -LiteralPath $temporaryKey -AclObject $acl
    Write-Host 'Opening tunnel. Start connect.ps1 in another PowerShell window while this one stays running.'
    & ssh -N -i $temporaryKey -L '127.0.0.1:8023:127.0.0.1:8023' -o BatchMode=yes -o ExitOnForwardFailure=yes -o StrictHostKeyChecking=accept-new ec2-user@3.228.211.12
}
finally {
    if (Test-Path -LiteralPath $temporaryKey) {
        & icacls $temporaryKey /grant:r "${account}:(F)" | Out-Null
        Remove-Item -LiteralPath $temporaryKey -Force
    }
}
