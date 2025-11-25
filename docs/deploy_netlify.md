# 🚀 Guia de Deploy no Netlify - SDJ Website

## Pré-requisitos
- Conta no GitHub (gratuita)
- Conta no Netlify (gratuita)

## Passo 1: Preparar o Repositório Git

### Inicializar Git (se ainda não foi feito)
```bash
git init
git add .
git commit -m "Initial commit - SDJ Website"
```

### Criar repositório no GitHub
1. Acesse https://github.com/new
2. Nome do repositório: `sdj-website`
3. Deixe como **público** ou **privado**
4. NÃO inicialize com README

### Conectar ao GitHub
```bash
git remote add origin https://github.com/SEU-USUARIO/sdj-website.git
git branch -M main
git push -u origin main
```

## Passo 2: Deploy no Netlify

### Opção A: Deploy via GitHub (Recomendado)

1. **Acesse** https://app.netlify.com
2. **Clique** em "Add new site" → "Import an existing project"
3. **Selecione** "GitHub"
4. **Autorize** o Netlify a acessar seus repositórios
5. **Escolha** o repositório `sdj-website`
6. **Configurações de Build:**
   - Build command: `echo "No build required"`
   - Publish directory: `.` (ponto)
7. **Clique** em "Deploy site"

### Opção B: Deploy Manual (Drag & Drop)

1. **Acesse** https://app.netlify.com
2. **Arraste** a pasta do projeto para a área "Drag and drop"
3. **Aguarde** o upload completar

## Passo 3: Configurar Domínio Personalizado (Opcional)

### Usar domínio gratuito do Netlify
1. No dashboard do site, vá em **Site settings** → **Domain management**
2. Clique em **Options** → **Edit site name**
3. Escolha um nome: `sdj-games.netlify.app`

### Usar domínio próprio
1. Compre um domínio (ex: registro.br, GoDaddy)
2. No Netlify: **Domain management** → **Add custom domain**
3. Adicione seu domínio: `sdjgames.com.br`
4. Configure os DNS conforme instruções do Netlify

## Passo 4: Configurar Formulário de Contato

O formulário já está configurado! O Netlify detecta automaticamente formulários com `data-netlify="true"`.

### Verificar submissões
1. No dashboard: **Forms**
2. Você receberá e-mails de notificação
3. Configure notificações em **Site settings** → **Forms** → **Form notifications**

### Configurar notificações por e-mail
1. **Forms** → **Form notifications**
2. **Add notification** → **Email notification**
3. Adicione seu e-mail: `contato@sdjgames.com.br`

## Passo 5: Configurar Integração de Pagamentos

### Mercado Pago

1. **Criar conta:** https://www.mercadopago.com.br
2. **Obter credenciais:**
   - Acesse: https://www.mercadopago.com.br/developers
   - Vá em **Suas integrações** → **Credenciais**
   - Copie a **Public Key** (produção)

3. **Adicionar ao site:**
   - Edite `checkout.html`
   - Substitua `YOUR_PUBLIC_KEY` pela sua Public Key
   - Implemente o checkout conforme documentação: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/landing

### PIX Manual
- Já configurado em `checkout.html`
- Atualize a chave PIX com seu e-mail ou chave aleatória
- Clientes enviam comprovante por e-mail

### Stripe (Alternativa Internacional)
1. Criar conta: https://stripe.com
2. Obter API keys
3. Integrar com Netlify Functions (serverless)

## Passo 6: Configurar HTTPS e Segurança

✅ **HTTPS automático** - O Netlify já ativa SSL/TLS gratuitamente!

### Verificar:
1. **Site settings** → **Domain management** → **HTTPS**
2. Deve estar marcado: "HTTPS enabled"

## Passo 7: Otimizações Pós-Deploy

### Configurar Analytics (Opcional)
```html
<!-- Adicione no <head> de todas as páginas -->
<script defer data-domain="seudominio.com" src="https://plausible.io/js/script.js"></script>
```

### Google Analytics
1. Crie uma propriedade em https://analytics.google.com
2. Adicione o código de rastreamento no `<head>`

### Configurar E-mail Profissional
- Use o domínio para criar: contato@sdjgames.com.br
- Opções: Google Workspace, Zoho Mail (gratuito até 5 usuários)

## Passo 8: Atualizações Futuras

### Deploy Automático (GitHub conectado)
```bash
# Faça alterações no código
git add .
git commit -m "Descrição das mudanças"
git push
# Netlify faz deploy automático!
```

### Deploy Manual
1. Arraste a pasta atualizada no Netlify
2. Ou use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Checklist Final ✅

- [ ] Site no ar e acessível
- [ ] Formulário de contato funcionando
- [ ] Notificações de formulário configuradas
- [ ] HTTPS ativo
- [ ] Domínio personalizado (se aplicável)
- [ ] Integração de pagamento configurada
- [ ] E-mail profissional configurado
- [ ] Analytics instalado (opcional)
- [ ] Testado em mobile e desktop

## Suporte e Recursos

- **Documentação Netlify:** https://docs.netlify.com
- **Netlify Forms:** https://docs.netlify.com/forms/setup/
- **Mercado Pago Docs:** https://www.mercadopago.com.br/developers
- **Comunidade Netlify:** https://answers.netlify.com

## Custos Estimados

| Serviço | Custo |
|---------|-------|
| Netlify (hosting) | **Gratuito** |
| Netlify Forms (100 submissões/mês) | **Gratuito** |
| Domínio .com.br | ~R$ 40/ano |
| E-mail profissional (Zoho) | **Gratuito** |
| Mercado Pago | Taxa por transação (~4%) |

---

**Dúvidas?** Entre em contato ou consulte a documentação oficial do Netlify.
