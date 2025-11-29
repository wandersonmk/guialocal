# Sistema Híbrido de Favoritos - GuiaLocal

## Como Funciona

O sistema de favoritos implementa uma **abordagem híbrida** que oferece a melhor experiência tanto para visitantes quanto para usuários cadastrados.

### Para Visitantes (Sem Login)
- ✅ Favoritos salvos localmente no navegador (`localStorage`)
- ✅ Funciona imediatamente, sem necessidade de cadastro
- ❌ Não sincroniza entre dispositivos
- ❌ Perdidos ao limpar cache

### Para Usuários Autenticados
- ✅ Favoritos salvos no Supabase (banco de dados)
- ✅ Sincroniza automaticamente entre todos os dispositivos
- ✅ Nunca são perdidos
- ✅ Favoritos locais migram automaticamente ao fazer login

## Estrutura do Banco de Dados

```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  store_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, store_id)
);
```

## Como Usar

### 1. Favoritar/Desfavoritar uma Loja
```vue
<script setup>
const { toggleFavorite, isFavorite } = useFavorites()

// Toggle favorite
await toggleFavorite('loja-id')

// Check if is favorite
const favorite = isFavorite('loja-id')
</script>
```

### 2. Fazer Login Anônimo (Opcional)
```vue
<script setup>
const { loginAnonymously, user } = useFavorites()

// Login anônimo para sincronizar favoritos
const result = await loginAnonymously()

if (result.success) {
  // Favoritos locais agora estão sincronizados!
  console.log('Usuário logado:', user.value)
}
</script>
```

### 3. Logout
```vue
<script setup>
const { logout } = useFavorites()

// Logout (mantém favoritos locais)
await logout()
</script>
```

## Fluxo Automático

1. **Ao abrir o app**: Carrega favoritos do localStorage
2. **Se usuário está logado**: Sincroniza favoritos locais → Supabase
3. **Ao favoritar**: Salva imediatamente no localStorage + Supabase (se logado)
4. **Ao fazer login**: Migra favoritos locais para a conta

## Segurança

- ✅ Row Level Security (RLS) habilitado
- ✅ Usuários só podem ver/editar seus próprios favoritos
- ✅ Políticas do Supabase impedem acesso não autorizado

## Próximos Passos (Opcional)

Para melhorar ainda mais, você pode adicionar:

1. **Login Social** (Google, Facebook)
```typescript
const { data, error } = await $supabase.auth.signInWithOAuth({
  provider: 'google'
})
```

2. **Login por Email**
```typescript
const { data, error } = await $supabase.auth.signInWithOtp({
  email: 'user@example.com'
})
```

3. **Interface de Conta**
- Botão de login/cadastro no header
- Página de perfil do usuário
- Indicador visual de sincronização

## Observações

- O sistema funciona perfeitamente **sem login** para uma experiência simples
- Login é **opcional** mas recomendado para sincronização
- Favoritos nunca são perdidos ao fazer logout (ficam no localStorage)
