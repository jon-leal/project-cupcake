# Casa do Cupcake 🧁

Uma loja virtual especializada em cupcakes artesanais, desenvolvida como projeto acadêmico. O sistema permite visualização de produtos, gestão de carrinho de compras e processo de checkout completo.


## 🌐 Demo Online

Acesse a demonstração do projeto: [Casa do Cupcake](https://amazing-zuccutto-d95e63.netlify.app/)

Para testar o sistema, você pode:

Navegar pelo catálogo de produtos
Adicionar itens ao carrinho
Simular uma compra
Criar uma conta de teste

## 🚀 Tecnologias Utilizadas

- TypeScript (97.5%)
- React.js com Vite
- Supabase (PostgreSQL)
- Bolt (No-Code Platform)
- Tailwind CSS

## ✨ Funcionalidades

- Catálogo de produtos (cupcakes e bolos)
- Carrinho de compras
- Sistema de autenticação
- Gestão de pedidos
- Interface responsiva
- Checkout integrado

## 🛠️ Configuração do Projeto

### Pré-requisitos

- Node.js
- npm ou yarn
- Conta no Supabase

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/project-cupcake.git
cd project-cupcake
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Preencha as variáveis no arquivo `.env`:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### Executando o Projeto

Desenvolvimento:
```bash
npm run dev
```

Build de produção:
```bash
npm run build
```

Visualizar build:
```bash
npm run preview
```

## 🗃️ Configuração do Supabase

### Estrutura do Banco de Dados

O projeto utiliza as seguintes tabelas no PostgreSQL:

- `orders`: Registro de pedidos
- `profiles`: Informações dos usuários
- `products`: Catálogo de produtos

### Migrations

As migrations são gerenciadas através do Supabase CLI. Para configurar:

1. Instale o Supabase CLI
2. Execute as migrations:
```bash
supabase init
supabase db reset
```

## 📱 Interface

A interface foi desenvolvida com foco em usabilidade e experiência do usuário, apresentando:

- Design responsivo
- Tema personalizado
- Componentes reutilizáveis
- Feedback visual para ações do usuário

## 🤝 Contribuição

Este é um projeto acadêmico, mas sugestões são bem-vindas:

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## ✍️ Autor

Jonatas Leal - Desenvolvido como projeto acadêmico