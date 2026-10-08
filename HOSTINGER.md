# Importar na Hostinger

Este projeto é **HTML/CSS/JavaScript estático**. Seus arquivos já estão na raiz e não precisam ser compilados.

## Via GitHub

1. No hPanel, abra o site de destino e vá a **Avançado → Git**. Em uma hospedagem Web/Cloud compatível, também é possível usar **Importar site → Implantar do GitHub**.
2. Conecte a conta GitHub e permita acesso ao repositório `KaioTriani/Helder-teste`.
3. Selecione **branch `main`**.
4. Selecione **diretório de destino `public_html`**. Se a interface mostrar o campo antigo “Install Path”, deixe-o vazio para usar a raiz `public_html`.
5. Clique em **Deploy / Implantar** e aguarde o painel confirmar a conclusão.
6. Abra o domínio e verifique a página, as três imagens e os links de contato. Ative o SSL e a opção de forçar HTTPS no hPanel quando o domínio estiver conectado.

### Configuração esperada

| Opção | Valor |
| --- | --- |
| Tipo | Site HTML personalizado / estático |
| Repositório | `https://github.com/KaioTriani/Helder-teste.git` |
| Branch | `main` |
| Raiz do código, caso solicitada | `.` |
| Diretório no servidor | `public_html` |
| Página inicial | `index.html` |
| Build / instalação | Deixar vazio; não necessário |
| Variáveis de ambiente | Nenhuma |

Se aparecer “framework não suportado” ou exigência de entrypoint Node.js, volte e escolha a integração Git para site HTML personalizado. Este repositório não é um app Node.js nem um projeto do Website/AI Builder.

Antes da implantação, preserve qualquer site existente no destino. Um `index.php` ou uma página padrão da hospedagem pode competir com o site; este projeto configura `DirectoryIndex index.html` no `.htaccess`.

## Alternativa: upload ZIP

1. Envie o ZIP de implantação pelo Gerenciador de Arquivos da Hostinger.
2. Extraia **diretamente em `public_html`**, sem uma pasta intermediária.
3. Confirme que existe `public_html/index.html`, junto de `studio.css`, `app.js`, `config.js`, as imagens PNG e `.htaccess`.

## Após alterações

Use **Redeploy** no painel ou habilite a implantação automática da branch `main`. Se aparecer uma versão antiga, limpe o cache da Hostinger/CDN e recarregue o navegador. Não é necessário rodar `npm install` ou `npm run build`.

## Limites da preparação

O repositório está pronto para o fluxo estático. Conexão com a conta Hostinger, disponibilidade do plano, domínio, SSL e implantação efetiva dependem do painel de hospedagem; não foram configurados por este repositório. O `.htaccess` destina-se a Apache/LiteSpeed; outros servidores podem ignorá-lo e servir os arquivos estáticos normalmente.

Documentação oficial consultada: https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/
