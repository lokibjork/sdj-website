# 🚀 Guia Rápido: GitHub + Netlify Deploy

## Passo 1: Criar Repositório no GitHub (Interface Web)

### Opção Mais Fácil - Pelo Site:

1. **Acesse:** https://github.com/new
2. **Preencha:**
   - Repository name: `sdj-website`
   - Description: `Website SDJ - Desenvolvimento de Jogos 2D`
   - Deixe como **Public** (ou Private se preferir)
   - **NÃO** marque "Add a README file"
   - **NÃO** marque "Add .gitignore"
3. **Clique** em "Create repository"

## Passo 2: Conectar seu Projeto ao GitHub

Abra o PowerShell na pasta do projeto e execute:

```powershell
cd C:\Users\Administrator\.gemini\antigravity\scratch\SDJ_Website

# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - SDJ Website com Mercado Pago integrado"

# Adicionar o repositório remoto (SUBSTITUA 'SEU-USUARIO' pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU-USUARIO/sdj-website.git

# Renomear branch para main
git branch -M main

# Enviar para o GitHub
git push -u origin main
```

### ⚠️ Se pedir autenticação:

O GitHub não aceita mais senha. Você precisa criar um **Personal Access Token**:

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Dê um nome: `SDJ Website Deploy`
4. Marque: `repo` (todas as opções)
5. Clique em "Generate token"
6. **COPIE O TOKEN** (você não verá novamente!)
7. Use o token como senha quando o Git pedir

## Passo 3: Deploy no Netlify

### Opção A: Via GitHub (Recomendado)

1. **Acesse:** https://app.netlify.com
2. **Clique** em "Add new site" → "Import an existing project"
3. **Selecione** "GitHub"
4. **Autorize** o Netlify
5. **Escolha** o repositório `sdj-website`
6. **Configurações:**
   - Build command: (deixe vazio)
   - Publish directory: `.` (ponto)
7. **Clique** em "Deploy site"

### Opção B: Deploy Manual (Sem GitHub)

1. **Acesse:** https://app.netlify.com
2. **Arraste** a pasta `SDJ_Website` para a área de drop
3. **Aguarde** o upload

## Passo 4: Configurar o Site

### Mudar o nome do site:
1. No dashboard do Netlify, clique em "Site settings"
2. "Domain management" → "Options" → "Edit site name"
3. Escolha: `sdj-games` (ficará: `sdj-games.netlify.app`)

### Configurar notificações de formulário:
1. "Forms" → "Form notifications"
2. "Add notification" → "Email notification"
3. Adicione seu e-mail

## Passo 5: Testar Tudo

Acesse seu site: `https://seu-site.netlify.app`

Teste:
- ✅ Formulário de contato
- ✅ Botão de checkout
- ✅ Modo escuro
- ✅ Todas as páginas

## 🎉 Pronto!

Seu site está no ar com:
- ✅ Formulário de contato funcionando
- ✅ Mercado Pago configurado (Public Key: `APP_USR-ed38559a-db8c-4f7e-b5bc-a2077f89103e`)
- ✅ PIX e transferência bancária
- ✅ HTTPS automático
- ✅ Deploy automático (se conectou via GitHub)

## Próximas Atualizações

Para fazer alterações:

```powershell
# Edite os arquivos
# Depois:
git add .
git commit -m "Descrição da mudança"
git push
# Netlify faz deploy automático!
```

## Problemas Comuns

### "Git não é reconhecido"
Instale o Git: https://git-scm.com/download/win

### "Permission denied"
Use o Personal Access Token como senha

### "Site não atualiza"
- Limpe o cache do navegador (Ctrl + Shift + R)
- Verifique o deploy no dashboard do Netlify

## Suporte

- **Netlify Docs:** https://docs.netlify.com
- **GitHub Docs:** https://docs.github.com
- **Mercado Pago:** https://www.mercadopago.com.br/developers
