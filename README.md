# Helder Loureiro Advocacia

Site institucional estático, preparado para publicação pela integração Git da Hostinger.

## Publicação rápida

- Repositório: `KaioTriani/Helder-teste`
- Branch: `main`
- Destino na Hostinger: `public_html`
- Entrada: `index.html`, já na raiz do repositório
- Instalação / build: **nenhum**
- Node.js, PHP, banco de dados e variáveis de ambiente: **não necessários**

Use a integração Git para sites HTML personalizados em hospedagem Web/Cloud. Não selecionar o fluxo de aplicação Node.js. Veja [HOSTINGER.md](HOSTINGER.md) para o passo a passo e a alternativa por upload ZIP.

## Arquivos

| Arquivo | Finalidade |
| --- | --- |
| `index.html` | Conteúdo semântico em português |
| `studio.css` | Design responsivo, microinterações e movimento reduzido |
| `app.js` | Menu, navegação, formulário, detalhes expansíveis, parallax e avaliações |
| `config.js` | Contatos e avaliações verificadas |
| `logo-hl.png` | Logo enviada pelo escritório |
| `helder-loureiro.png` | Retrato enviado pelo escritório |
| `escritorio-editado.png` | Parede do escritório tratada, sem impressora |
| `.htaccess` | Entrada padrão, UTF-8, compressão e revalidação de arquivos de código |

Todos os arquivos visuais são locais e as referências são relativas, permitindo implantação no domínio ou em uma subpasta. Não há dependência do domínio anterior, Cloudflare Workers, Sites ou autenticação do Codex. Google Fonts, Maps, WhatsApp, Instagram, LinkedIn e Medium permanecem como serviços externos.

## Contato e informações

WhatsApp configurado: **+55 83 98895-5052**. O formulário prepara a mensagem para envio pelo visitante no WhatsApp: não armazena dados e não confirma consultas. E-mail omitido conforme orientação do responsável.

As avaliações integrais do Google não foram disponibilizadas. A seção liga ao perfil oficial; nenhum depoimento, média ou contagem foi inventado. O carrossel lê todos os registros de `OFFICE_CONFIG.reviews`; não há sincronização automática.

A trajetória foi fornecida pelo responsável. Logo e retrato são os anexos enviados; o prompt da edição da foto da parede está em `EDICAO-IMAGEM.txt`.

## Alterações futuras

Edite os arquivos e envie para `main`. Com a implantação automática ativada na Hostinger, novos commits dessa branch serão implantados. A conexão inicial, o domínio e o SSL são configurados no painel da hospedagem.

