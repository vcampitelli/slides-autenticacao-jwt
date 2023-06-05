<?php

declare(strict_types=1);

namespace App;

use DateTimeImmutable;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\JwtFacade;
use Lcobucci\JWT\Signer;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Rsa\Sha256;
use Lcobucci\JWT\Token;

readonly class JwtBuilder
{
    private JwtFacade $facade;

    public function __construct(private Key $key)
    {
        $this->facade = new JwtFacade();
    }

    public function __invoke(
        string $subject,
        string $issuer,
        string $audience,
    ): Token
    {
        return $this->facade->issue(
            $this->getSigner(),
            $this->key,
            static fn(
                Builder $builder,
                DateTimeImmutable $issuedAt
            ): Builder => $builder
                ->relatedTo($subject)
                ->issuedBy($issuer)
                ->permittedFor($audience)
                ->expiresAt($issuedAt->modify('+1 hour'))
        );
    }

    protected function getSigner(): Signer
    {
        return new Sha256();
    }
}
