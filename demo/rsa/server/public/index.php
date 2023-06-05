<?php

declare(strict_types=1);

use Lcobucci\JWT\Signer\Key\InMemory;

require __DIR__ . '/../vendor/autoload.php';

// @TODO: jwks

$builder = new \App\JwtBuilder(
    InMemory::file(__DIR__ . '/../data/jwt.key'),
);
$token = $builder(
    subject: 'teste@teste.com',
    issuer: 'viniciuscampitelli.com',
    audience: 'confloss2023',
);
header('Content-type: application/json');
echo json_encode([
    'access_token' => $token->toString(),
]);

