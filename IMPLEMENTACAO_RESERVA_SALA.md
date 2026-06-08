# Implementação de Reserva de Sala

## Estrutura Implementada

Foram criados novos componentes e serviços para implementar a funcionalidade de reserva de sala de forma alinhada com a arquitetura do seu projeto:

### 1. **Componente Modal de Reserva** 
📁 `src/components/moleculas/ModalReservaSala/`
- `ModalReservaSala.jsx` - Componente molécula que encapsula o modal
- `ModalReservaSala.css` - Estilos do modal

O componente utiliza:
- `Modal` (átomo) - Estrutura base do modal
- `InputDate` (átomo) - Seletor de data
- `Botao` (átomo) - Botões de ação

### 2. **Serviço de Reservas**
📁 `src/service/`
- `reservaService.js` - Funções para chamadas API

Funções disponíveis:
```javascript
// Criar nova reserva
criarReserva(reserva) 

// Buscar reservas por usuário
buscarReservasPorUsuario(usuarioId)

// Buscar reservas por sala
buscarReservasPorSala(salaId)

// Deletar reserva
deletarReserva(id)
```

### 3. **Atualização do CardSala**
📁 `src/components/organismo/CardSala/`

O CardSala foi atualizado com:
- Novo estado `mostrarModalReserva` para controlar a visibilidade do modal
- Props adicionais: `salaId` e `onReservaSuccess` (opcional)
- Novo botão "Reservar Sala" com destaque visual (verde)
- Renderização condicional do modal

---

## Como Usar

### No componente onde você renderiza CardSala:

```jsx
import CardSala from "../../CardSala/CardSala";
import { useState } from "react";

// Dentro do seu componente de página
const [atualizarReservas, setAtualizarReservas] = useState(0);

// Ao renderizar o CardSala:
<CardSala
  salaId={sala.id}  // IMPORTANTE: passar o ID da sala
  tipoSala={sala.tipoSala}
  tipo={sala.tipo}
  nome={sala.nome}
  descricao={sala.descricao}
  capacidade={sala.capacidade}
  preco={sala.preco}
  rua={sala.rua}
  numero={sala.numero}
  bairro={sala.bairro}
  cidade={sala.cidade}
  estado={sala.estado}
  cep={sala.cep}
  imagem={sala.imagem}
  actions={actions} // suas ações customizadas continuam funcionando
  onReservaSuccess={() => {
    // Callback opcional quando a reserva é criada com sucesso
    // Use para recarregar dados ou atualizar UI
    setAtualizarReservas(prev => prev + 1);
  }}
/>
```

---

## Fluxo da Reserva

1. **Usuário clica no botão "Reservar Sala"**
   - Modal é exibido

2. **Modal apresenta:**
   - Campo de data com `InputDate`
   - Botões "Reservar" e "Cancelar"
   - Validação de data preenchida

3. **Ao clicar "Reservar":**
   - Busca `usuarioId` do localStorage
   - Cria objeto ReservaDTO com:
     - `usuarioId` (do localStorage)
     - `salaId` (passado como prop)
     - `data` (selecionada)
   - Envia POST para `/api/reservas`
   - Fecha modal ao sucesso
   - Chama `onReservaSuccess` se fornecido

4. **Tratamento de erros:**
   - Validação de data obrigatória
   - Verificação de autenticação
   - Mensagens de erro exibidas no modal

---

## Backend Esperado

Seu backend deve ter:

```
POST /api/reservas
  - Recebe: ReservaDTO com usuarioId, salaId, data
  - Retorna: ReservaDTO criada ou erro

GET /api/reservas/usuario/{usuarioId}
  - Retorna: List<ReservaDTO>

GET /api/reservas/sala/{salaId}
  - Retorna: List<ReservaDTO>

DELETE /api/reservas/{id}
  - Retorna: sucesso ou erro
```

---

## Requisitos

✅ **O usuário deve estar autenticado:**
- O `usuarioId` é obtido de `localStorage.getItem("usuarioId")`
- Certifique-se de que este valor está sendo armazenado no localStorage durante o login

---

## Customizações Possíveis

### Alterar cores do botão:
Editar em `CardSala.css`:
```css
.card-sala_action-button-reserva {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  color: #fff;
}
```

### Adicionar validações extras:
No `ModalReservaSala.jsx`, adicione antes de `handleReservar`:
```javascript
// Ex: não permitir datas no passado
const hoje = new Date().toISOString().split('T')[0];
if (data < hoje) {
  setErro("Não é permitido reservar em datas passadas");
  return;
}
```

### Integrar com notificações:
Após sucesso, use seu sistema de notificações (toast, snackbar, etc)

---

## Arquivos Criados/Modificados

✅ **Criados:**
- `src/components/moleculas/ModalReservaSala/ModalReservaSala.jsx`
- `src/components/moleculas/ModalReservaSala/ModalReservaSala.css`
- `src/service/reservaService.js`

✅ **Modificados:**
- `src/components/organismo/CardSala/CardSala.jsx`
- `src/components/organismo/CardSala/CardSala.css`
