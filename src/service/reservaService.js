const BASE_URL = "http://localhost:8080/api/reservas";

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

function createError(message) {
  return new Error(message || "Erro na requisição de reserva");
}

export async function criarReserva(reserva) {
  try {
    console.log("[reservaService] Enviando reserva:", reserva);
    
    const payload = {
      usuarioId: Number(reserva.usuarioId),
      salaId: Number(reserva.salaId),
      data: reserva.data,
    };

    console.log("[reservaService] Payload formatado:", payload);

    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("[reservaService] Status da resposta:", response.status);

    if (!response.ok) {
      const dados = await parseResponse(response);
      console.error("[reservaService] Erro na resposta:", dados);
      throw createError(
        dados.message || `Erro ao criar reserva: ${response.statusText}`
      );
    }

    const resultado = await parseResponse(response);
    console.log("[reservaService] Reserva criada com sucesso:", resultado);
    return resultado;
  } catch (erro) {
    console.error("[reservaService] Erro ao criar reserva:", erro);
    throw createError(erro.message);
  }
}

export async function buscarTodasReservas() {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw createError(`Erro ao buscar reservas: ${response.statusText}`);
    }

    return await parseResponse(response);
  } catch (erro) {
    throw createError(erro.message);
  }
}

export async function buscarReservasPorUsuario(usuarioId) {
  try {
    const todasReservas = await buscarTodasReservas();
    
    if (!Array.isArray(todasReservas)) {
      return [];
    }

    return todasReservas.filter((reserva) => {
      const reservaUsuarioId = reserva.usuarioId || reserva.usuario_id || reserva.usuario?.id;
      return Number(reservaUsuarioId) === Number(usuarioId);
    });
  } catch (erro) {
    throw createError(erro.message);
  }
}

export async function buscarReservasPorSala(salaId) {
  try {
    const todasReservas = await buscarTodasReservas();
    
    if (!Array.isArray(todasReservas)) {
      return [];
    }

    return todasReservas.filter((reserva) => {
      const reservaSalaId = reserva.salaId || reserva.sala_id || reserva.sala?.id;
      return Number(reservaSalaId) === Number(salaId);
    });
  } catch (erro) {
    throw createError(erro.message);
  }
}

export async function atualizarReserva(id, reservaData) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservaData),
    });

    if (!response.ok) {
      throw createError(`Erro ao atualizar reserva: ${response.statusText}`);
    }

    return await parseResponse(response);
  } catch (erro) {
    throw createError(erro.message);
  }
}

export async function deletarReserva(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw createError(`Erro ao deletar reserva: ${response.statusText}`);
    }

    return await parseResponse(response);
  } catch (erro) {
    throw createError(erro.message);
  }
}
