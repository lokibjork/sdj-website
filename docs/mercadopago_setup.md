# 🔐 Como Adicionar sua Public Key do Mercado Pago

## Passo 1: Localizar sua Public Key

Você já obteve sua Public Key! Ela deve ter este formato:
```
APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

ou

```
TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## Passo 2: Adicionar no arquivo checkout.html

1. Abra o arquivo `checkout.html`
2. Procure pela linha 177 (aproximadamente):
   ```javascript
   const MP_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Cole sua Public Key aqui
   ```

3. Substitua `'YOUR_PUBLIC_KEY'` pela sua Public Key real:
   ```javascript
   const MP_PUBLIC_KEY = 'APP_USR-sua-public-key-aqui';
   ```

## Passo 3: Testar a Integração

### Modo Teste (Sandbox)
Se sua key começa com `TEST-`:
- Use cartões de teste do Mercado Pago
- Não será cobrado valor real
- Documentação: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards

### Modo Produção
Se sua key começa com `APP_USR-`:
- Pagamentos reais serão processados
- Certifique-se de ter configurado sua conta corretamente

## Passo 4: Criar Netlify Function (Necessário para Produção)

Para que o checkout funcione completamente, você precisa criar uma Netlify Function para gerar as preferências de pagamento de forma segura.

### Criar a pasta de functions:
```bash
mkdir netlify
mkdir netlify/functions
```

### Criar o arquivo `create-preference.js`:

```javascript
// netlify/functions/create-preference.js
const mercadopago = require('mercadopago');

exports.handler = async (event) => {
  // Configurar credenciais (use variáveis de ambiente)
  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN
  });

  try {
    const item = JSON.parse(event.body);

    const preference = {
      items: [
        {
          title: item.title,
          description: item.description,
          unit_price: parseFloat(item.price),
          quantity: parseInt(item.quantity),
        }
      ],
      back_urls: {
        success: `${process.env.URL}/sucesso.html`,
        failure: `${process.env.URL}/checkout.html`,
        pending: `${process.env.URL}/checkout.html`
      },
      auto_return: 'approved',
      notification_url: `${process.env.URL}/.netlify/functions/webhook`
    };

    const response = await mercadopago.preferences.create(preference);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ id: response.body.id })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### Instalar dependência:
```bash
npm init -y
npm install mercadopago
```

### Configurar variáveis de ambiente no Netlify:

1. Acesse o dashboard do Netlify
2. Vá em **Site settings** → **Environment variables**
3. Adicione:
   - `MP_ACCESS_TOKEN`: Sua Access Token do Mercado Pago
   - `MP_PUBLIC_KEY`: Sua Public Key

### Atualizar netlify.toml:
```toml
[build]
  functions = "netlify/functions"
  publish = "."
```

## Passo 5: Descomente o código no checkout.html

No arquivo `checkout.html`, procure por:
```javascript
// OPÇÃO 1: Usar Netlify Functions (recomendado para produção)
// Descomente quando criar a function
/*
const response = await fetch('/.netlify/functions/create-preference', {
```

Remova os comentários `/*` e `*/` para ativar a integração completa.

## Alternativa Simples (Sem Backend)

Se você não quiser criar a Netlify Function agora, o sistema já está configurado para:
1. Mostrar um alerta explicativo
2. Redirecionar para o formulário de contato
3. Você processa o pagamento manualmente

## Recursos Úteis

- **Documentação Mercado Pago**: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/landing
- **Cartões de Teste**: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards
- **Netlify Functions**: https://docs.netlify.com/functions/overview/

## Suporte

Se tiver dúvidas, consulte a documentação ou entre em contato com o suporte do Mercado Pago.
