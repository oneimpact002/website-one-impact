export const prerender = false;

const QUESTIONS = {
  segmento: {
    label: 'Segmento',
    options: {
      juridico: 'Advocacia / Jurídico', saude: 'Saúde', contabil: 'Contábil / Financeiro',
      tech: 'Tecnologia / Agência digital', educacao: 'Educação / Coaching / Mentoria',
      imobiliario: 'Imobiliário', estetica: 'Estética / Beleza', construcao: 'Engenharia / Construção',
      varejo: 'Varejo / E-commerce', alimentacao: 'Alimentação', industria: 'Indústria / Logística', outro: 'Outro',
    },
  },
  tempoAtuacao: {
    label: 'Tempo de atuação',
    options: { ate2anos: 'Até 2 anos', '2a5anos': '2 a 5 anos', '5a10anos': '5 a 10 anos', mais10anos: 'Mais de 10 anos' },
  },
  canais: {
    label: 'Canais de aquisição',
    options: { indicacao: 'Indicação', google: 'Google', instagram: 'Instagram', anuncios: 'Anúncios pagos', parcerias: 'Parcerias', eventos: 'Eventos' },
  },
  leads: {
    label: 'Leads por mês',
    options: { menos20: 'Menos de 20', '20a50': '20 a 50', '50a100': '50 a 100', mais100: 'Mais de 100', naossei: 'Não sabe' },
  },
  valorMedio: {
    label: 'Valor médio do serviço',
    options: { ate2000: 'Até R$ 2.000', '2000a5000': 'R$ 2.000 a 5.000', '5000a10000': 'R$ 5.000 a 10.000', '10000a20000': 'R$ 10.000 a 20.000', acima20000: 'Acima de R$ 20.000' },
  },
  tempoResposta: {
    label: 'Tempo de resposta no WhatsApp',
    options: { '30min': '5 a 30 minutos', '1h': '30 min a 1 hora', '3h': '1 a 3 horas', mais: 'Mais de 3 horas / dia seguinte' },
  },
  estrutura: {
    label: 'Estrutura digital',
    options: { site: 'Site institucional', gmb: 'Google Meu Negócio', instagram: 'Instagram', landing: 'Landing Page', whatsapp_business: 'WhatsApp Business', email_marketing: 'E-mail marketing', anuncios: 'Anúncios pagos', isca: 'Isca digital' },
  },
  atualizacaoSite: {
    label: 'Última atualização do site',
    options: { ate1ano: 'Últimos 12 meses', '1a2anos': '1 a 2 anos', mais3anos: '3+ anos', naosei: 'Não lembra' },
  },
  automacao: {
    label: 'Automação de atendimento',
    options: { nenhuma: 'Nenhuma', padrao: 'Mensagem automática padrão', chatbot: 'Chatbot', ia: 'IA inteligente', naossei: 'Tem mas não sabe como funciona' },
  },
}

function formatAnswers(answers) {
  if (!answers || typeof answers !== 'object') return { notes: [], contactNotes: '' }
  const lines = Object.entries(answers)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([key, value]) => {
      const q = QUESTIONS[key]
      const label = q?.label || key
      const vals = Array.isArray(value) ? value : [value]
      const readable = vals.map((v) => q?.options?.[v] || v).join(', ')
      return `${label}: ${readable}`
    })
  return {
    notes: lines,
    contactNotes: lines.join('\n'),
  }
}

const RENVCHAT_KEY = 'crz_jKyX6g0OSa7Bh-yvwfNpfX5J_gk6K9n0';
const RENVCHAT_URL = 'https://app.renvchat.com.br/api/v1';

export async function POST({ request }) {
  try {
    const { nome, whatsapp, email, answers } = await request.json();
    const { notes, contactNotes } = formatAnswers(answers);

    const phone = whatsapp ? (whatsapp.startsWith('55') ? whatsapp : `55${whatsapp}`) : null;

    if (!phone) {
      return new Response(
        JSON.stringify({ ok: false, error: 'WhatsApp obrigatório' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const res = await fetch(`${RENVCHAT_URL}/deals/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RENVCHAT_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          phone,
          name: nome || phone,
          ...(email ? { email } : {}),
          ...(contactNotes ? { notes: contactNotes } : {}),
        },
        kanban: {
          sector_id: '072d56e0-c26c-45f1-a100-2635415a61d3',
          column_id: '8cc5624f-b380-44e0-8136-19bb740468e3',
        },
        deal: {
          lead_source: 'Diagnóstico - Site',
        },
        notes,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('[RenvChat] Erro ao criar deal:', data);
      return new Response(
        JSON.stringify({ ok: false, error: data }),
        { status: res.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const contactId = data.deal?.contact?.id;
    if (contactId) {
      await fetch(`${RENVCHAT_URL}/contacts/tags`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RENVCHAT_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact_id: contactId,
          tag_ids: ['e15235d7-4864-4070-bc7a-d6c2ff8c1e88'],
        }),
      }).catch((e) => console.error('[RenvChat] Erro ao aplicar etiqueta:', e));
    }

    return new Response(
      JSON.stringify({ ok: true, deal_id: data.deal?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[RenvChat] Exceção:', err);
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
