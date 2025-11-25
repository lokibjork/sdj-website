# 🚀 Configuração Final - Mercado Pago no Netlify

## ✅ O que já está pronto:

1. ✅ Netlify Function criada (`netlify/functions/create-preference.js`)
2. ✅ Package.json com dependência do Mercado Pago
3. ✅ netlify.toml configurado com pasta de functions
4. ✅ checkout.html integrado com a function
5. ✅ Public Key configurada: `APP_USR-ed38559a-db8c-4f7e-b5bc-a2077f89103e`

## 📝 O que você precisa fazer no Netlify:

### Passo 1: Adicionar Variável de Ambiente (Access Token)

1. **Acesse** o dashboard do seu site no Netlify
2. **Vá em:** Site settings → Environment variables
3. **Clique** em "Add a variable"
4. **Adicione:**
   - **Key:** `MP_ACCESS_TOKEN`
   - **Value:** Sua Access Token do Mercado Pago

### Como obter a Access Token:

1. Acesse: https://www.mercadopago.com.br/developers/panel/app
2. Clique na sua aplicação (ou crie uma nova)
3. Vá em "Credenciais"
4. Copie a **Access Token de Produção** (começa com `APP_USR-`)
5. Cole no Netlify

### Passo 2: Configurar Functions Directory (se necessário)

No Netlify, vá em:
- **Site settings** → **Build & deploy** → **Build settings**
- **Functions directory:** `netlify/functions`
- (Isso já deve estar configurado pelo netlify.toml)

### Passo 3: Fazer Redeploy

Depois de adicionar a variável de ambiente:
1. Vá em **Deploys**
2. Clique em **Trigger deploy** → **Deploy site**

## 🧪 Como Testar:

1. Acesse seu site
2. Vá em "Serviços"
3. Configure um pacote
4. Clique em "Ir para Pagamento"
5. Clique em "Pagar com Mercado Pago"
6. Deve abrir o checkout do Mercado Pago!

## ⚠️ Troubleshooting:

### Erro: "Erro ao criar preferência"
- Verifique se a Access Token está correta
- Verifique se a variável `MP_ACCESS_TOKEN` está configurada
- Veja os logs da function em: Netlify → Functions → Logs

### Erro: "Function not found"
- Verifique se o deploy incluiu a pasta `netlify/functions`
- Veja em: Netlify → Functions (deve aparecer `create-preference`)

### Como ver os logs:
1. Netlify Dashboard → Functions
2. Clique em `create-preference`
3. Veja os logs de execução

## 📊 Monitoramento:

- **Formulários:** Netlify → Forms
- **Functions:** Netlify → Functions
- **Deploy:** Netlify → Deploys

## 💰 Custos:

- **Netlify Functions:** 125.000 invocações/mês GRÁTIS
- **Mercado Pago:** Taxa por transação (~4%)

---

**Tudo pronto!** Assim que adicionar a Access Token, o Mercado Pago estará 100% funcional! 🎉
