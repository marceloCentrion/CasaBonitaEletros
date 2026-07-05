<template>
  <main id="page_atendimento" aria-labelledby="atendimento_heading">
    <section class="at_hero" aria-label="Central de Atendimento Casa Bonita Eletros">
      <NuxtImg
        src="/images/hero1.jpg"
        alt="Cozinha equipada com eletrodomésticos premium"
        class="at_hero_img"
        preload
      />
      <div class="at_hero_overlay">
        <div class="at_container at_hero_content">
          <span class="at_tag">Central de Atendimento</span>
          <h1 id="atendimento_heading">
            Atendimento direto para compras, pedidos e suporte.
          </h1>
          <p>
            Conte com a equipe da Casa Bonita Eletros para tirar dúvidas, acompanhar
            pedidos e receber orientação sobre produtos e pós-venda.
          </p>
          <div class="at_hero_actions">
            <a :href="whatsappHref" target="_blank" rel="noopener noreferrer" class="at_btn at_btn--light">
              <i class="bi bi-whatsapp" aria-hidden="true"></i>
              Chamar no WhatsApp
            </a>
            <a :href="phoneHref" class="at_btn at_btn--outline">
              <i class="bi bi-telephone" aria-hidden="true"></i>
              Ligar para a loja
            </a>
          </div>
        </div>
      </div>
    </section>

    <nav class="at_breadcrumb" aria-label="Você está em">
      <div class="at_container at_breadcrumb_inner">
        <NuxtLink to="/" class="at_breadcrumb_link">Início</NuxtLink>
        <i class="bi bi-chevron-right" aria-hidden="true"></i>
        <span>Central de Atendimento</span>
      </div>
    </nav>

    <section class="at_channels" aria-labelledby="channels_heading">
      <div class="at_container">
        <div class="at_section_header">
          <span class="at_tag at_tag--dark">Canais oficiais</span>
          <h2 id="channels_heading">Escolha como prefere falar conosco.</h2>
        </div>

        <div class="at_channels_grid">
          <article class="at_channel_card at_channel_card--primary">
            <span class="at_channel_icon">
              <i class="bi bi-whatsapp" aria-hidden="true"></i>
            </span>
            <div>
              <span class="at_channel_label">Mais rápido</span>
              <h3>WhatsApp</h3>
              <p>
                Ideal para dúvidas sobre produtos, andamento de pedidos,
                disponibilidade e atendimento pós-venda.
              </p>
              <a :href="whatsappHref" target="_blank" rel="noopener noreferrer" class="at_channel_link">
                Iniciar conversa
                <i class="bi bi-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </article>

          <article class="at_channel_card">
            <span class="at_channel_icon">
              <i class="bi bi-telephone" aria-hidden="true"></i>
            </span>
            <div>
              <span class="at_channel_label">Atendimento por voz</span>
              <h3>{{ telefoneLabel }}</h3>
              <p>
                Para orientações rápidas, confirmação de informações e contato
                direto com a equipe da loja.
              </p>
              <a :href="phoneHref" class="at_channel_link">
                Fazer ligação
                <i class="bi bi-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="at_support" aria-labelledby="support_heading">
      <div class="at_container at_support_grid">
        <div class="at_support_content">
          <span class="at_tag at_tag--dark">Como podemos ajudar</span>
          <h2 id="support_heading">Um atendimento simples, objetivo e próximo.</h2>
          <p>
            Para agilizar sua solicitação, informe o número do pedido quando
            houver, nome completo do comprador e uma breve descrição do que você
            precisa resolver.
          </p>
        </div>

        <ul class="at_topics" aria-label="Assuntos atendidos">
          <li v-for="topic in topics" :key="topic.title">
            <i :class="topic.icon" class="bi" aria-hidden="true"></i>
            <div>
              <h3>{{ topic.title }}</h3>
              <p>{{ topic.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="at_flow" aria-labelledby="flow_heading">
      <div class="at_container">
        <div class="at_section_header">
          <span class="at_tag at_tag--dark">Fluxo de atendimento</span>
          <h2 id="flow_heading">O que acontece depois do seu contato.</h2>
        </div>

        <ol class="at_flow_steps">
          <li v-for="step in steps" :key="step.title">
            <span>{{ step.number }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="at_info" aria-labelledby="info_heading">
      <div class="at_container at_info_grid">
        <div>
          <span class="at_tag at_tag--light">Informações úteis</span>
          <h2 id="info_heading">Tenha esses dados em mãos.</h2>
          <p>
            Isso ajuda nossa equipe a localizar seu atendimento com mais
            precisão e responder com mais agilidade.
          </p>
        </div>

        <ul class="at_info_list">
          <li v-for="item in infoList" :key="item">
            <i class="bi bi-check2" aria-hidden="true"></i>
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <section class="at_cta" aria-labelledby="cta_heading">
      <div class="at_container at_cta_inner">
        <div>
          <span class="at_tag at_tag--dark">Fale agora</span>
          <h2 id="cta_heading">Nossa equipe está pronta para atender você.</h2>
        </div>
        <div class="at_cta_actions">
          <a :href="whatsappHref" target="_blank" rel="noopener noreferrer" class="at_btn at_btn--primary">
            <i class="bi bi-whatsapp" aria-hidden="true"></i>
            WhatsApp
          </a>
          <a :href="phoneHref" class="at_btn at_btn--dark-outline">
            <i class="bi bi-telephone" aria-hidden="true"></i>
            Telefone
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
definePageMeta({ layout: "site" });

useHead({
  title: "Central de Atendimento | Casa Bonita Eletros",
  meta: [
    {
      name: "description",
      content:
        "Central de Atendimento Casa Bonita Eletros: fale com nossa equipe por telefone ou WhatsApp para compras, pedidos e suporte.",
    },
  ],
});

const state = reactive({
  empresa: {},
});
const { carregarEmpresaSite } = useSiteData();

onMounted(() => {
  fetchEmpresa();
});

async function fetchEmpresa() {
  try {
    state.empresa = await carregarEmpresaSite();
  } catch (error) {
    console.error("Erro ao buscar dados da empresa:", error);
  }
}

const telefoneDigits = computed(() => {
  return (state.empresa.telefone || "").replace(/\D/g, "");
});

const whatsappDigits = computed(() => {
  return (state.empresa.whatsapp || state.empresa.telefone || "").replace(/\D/g, "");
});

const telefoneComPais = computed(() => {
  if (!telefoneDigits.value) return "";
  return telefoneDigits.value.startsWith("55")
    ? telefoneDigits.value
    : `55${telefoneDigits.value}`;
});

const whatsappComPais = computed(() => {
  if (!whatsappDigits.value) return "";
  return whatsappDigits.value.startsWith("55")
    ? whatsappDigits.value
    : `55${whatsappDigits.value}`;
});

const telefoneLabel = computed(() => {
  return state.empresa.telefone || "Telefone da loja";
});

const whatsappHref = computed(() => {
  if (!whatsappComPais.value) return "/contato";

  const message = encodeURIComponent(
    "Olá! Vim pelo site da Casa Bonita Eletros e preciso de atendimento.",
  );
  return `https://wa.me/${whatsappComPais.value}?text=${message}`;
});

const phoneHref = computed(() => {
  return telefoneComPais.value ? `tel:+${telefoneComPais.value}` : "/contato";
});

const topics = [
  {
    icon: "bi-bag-check",
    title: "Compras e produtos",
    text: "Orientação sobre modelos, disponibilidade, combinações e escolha ideal.",
  },
  {
    icon: "bi-box-seam",
    title: "Pedidos e entrega",
    text: "Acompanhamento de pedidos, prazos, status e informações de entrega.",
  },
  {
    icon: "bi-arrow-repeat",
    title: "Trocas e devoluções",
    text: "Direcionamento para solicitações, prazos e condições de análise.",
  },
  {
    icon: "bi-shield-check",
    title: "Garantia e pós-venda",
    text: "Apoio para acionar suporte, assistência e orientações do fabricante.",
  },
];

const steps = [
  {
    number: "01",
    title: "Contato inicial",
    text: "Você chama pelo WhatsApp ou telefone e informa o assunto principal.",
  },
  {
    number: "02",
    title: "Identificação",
    text: "Localizamos pedido, produto ou cadastro para entender o contexto.",
  },
  {
    number: "03",
    title: "Orientação",
    text: "Nossa equipe indica o melhor caminho e os próximos passos.",
  },
  {
    number: "04",
    title: "Acompanhamento",
    text: "Quando necessário, mantemos o atendimento até a conclusão.",
  },
];

const infoList = [
  "Número do pedido, se a compra já foi realizada.",
  "Nome completo ou CPF do comprador.",
  "Fotos ou vídeos, em casos de avaria, defeito ou dúvida técnica.",
  "CEP de entrega, para consultas de prazo ou disponibilidade.",
];
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

#page_atendimento {
  background: #fff;
  color: #1a1a1a;
}

.at_container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.at_hero {
  position: relative;
  min-height: 430px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #111;
}

.at_hero_img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.at_hero_overlay {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 430px;
  display: flex;
  align-items: center;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.78) 0%,
    rgba(0, 0, 0, 0.48) 56%,
    rgba(0, 0, 0, 0.08) 100%
  );
}

.at_hero_content {
  max-width: 720px;
  color: #fff;
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.at_hero_content h1 {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 1.25rem;
}

.at_hero_content p {
  max-width: 620px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 15px;
  line-height: 1.75;
  margin: 0 0 2rem;
}

.at_tag {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 999px;
  padding: 6px 14px;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 1rem;
}

.at_tag--dark {
  color: var(--primary);
  border-color: rgba(7, 22, 60, 0.18);
  background: rgba(7, 22, 60, 0.04);
}

.at_tag--light {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.26);
  background: rgba(255, 255, 255, 0.08);
}

.at_hero_actions,
.at_cta_actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.at_btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 12px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  line-height: 1;
  transition:
    background 0.18s,
    border-color 0.18s,
    color 0.18s,
    transform 0.18s;

  &:hover {
    transform: translateY(-2px);
  }
}

.at_btn--light {
  background: #fff;
  border: 1px solid #fff;
  color: #111;

  &:hover {
    background: var(--primary);
    border-color: var(--primary);
    color: #fff;
  }
}

.at_btn--outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.72);
  color: #fff;

  &:hover {
    background: #fff;
    color: #111;
  }
}

.at_btn--primary {
  background: var(--primary);
  border: 1px solid var(--primary);
  color: #fff;

  &:hover {
    background: #111;
    border-color: #111;
  }
}

.at_btn--dark-outline {
  background: #fff;
  border: 1px solid #cfd3dc;
  color: #17213a;

  &:hover {
    background: #17213a;
    border-color: #17213a;
    color: #fff;
  }
}

.at_breadcrumb {
  border-bottom: 1px solid #e8e8e8;
  background: #fafafa;
}

.at_breadcrumb_inner {
  min-height: 46px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 13px;

  i {
    font-size: 10px;
    color: #aaa;
  }

  span {
    color: #1a1a1a;
    font-weight: 600;
  }
}

.at_breadcrumb_link {
  color: #555;
  text-decoration: none;

  &:hover {
    color: var(--primary);
  }
}

.at_channels,
.at_flow,
.at_cta {
  padding: 72px 0;
  background: #fff;
}

.at_section_header {
  max-width: 760px;
  margin-bottom: 2rem;

  h2 {
    color: #151515;
    font-size: 32px;
    line-height: 1.22;
    font-weight: 700;
    margin: 0;
  }
}

.at_channels_grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.at_channel_card {
  border: 1px solid #e6e8ee;
  border-radius: 8px;
  padding: 1.75rem;
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 1.25rem;
  min-height: 260px;
  background: #fff;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;

  &:hover {
    border-color: rgba(7, 22, 60, 0.28);
    box-shadow: 0 18px 42px rgba(18, 26, 43, 0.08);
    transform: translateY(-3px);
  }

  h3 {
    color: #151515;
    font-size: 22px;
    line-height: 1.25;
    font-weight: 700;
    margin: 0 0 0.7rem;
  }

  p {
    color: #5d626c;
    font-size: 14px;
    line-height: 1.7;
    margin: 0 0 1.25rem;
  }
}

.at_channel_card--primary {
  background: #f7f7f8;
}

.at_channel_icon {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: #fff;
  font-size: 22px;
}

.at_channel_label {
  display: block;
  color: #7a808c;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 0.45rem;
}

.at_channel_link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--primary);
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;

  &:hover {
    color: #111;
  }
}

.at_support {
  padding: 76px 0;
  background: #f7f7f8;
}

.at_support_grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
  gap: 4rem;
  align-items: start;
}

.at_support_content h2 {
  color: #151515;
  font-size: 34px;
  line-height: 1.2;
  font-weight: 700;
  margin: 0 0 1.1rem;
}

.at_support_content p {
  color: #53565f;
  font-size: 15px;
  line-height: 1.75;
  margin: 0;
}

.at_topics {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.at_topics li {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 1rem;
  border: 1px solid #e2e5ec;
  border-radius: 8px;
  background: #fff;
  padding: 1.25rem;

  > i {
    width: 42px;
    height: 42px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    background: #f4f6fa;
    font-size: 18px;
  }

  h3 {
    color: #171717;
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 0.45rem;
  }

  p {
    color: #5d626c;
    font-size: 13px;
    line-height: 1.6;
    margin: 0;
  }
}

.at_flow_steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin: 0;
  padding: 0;
  border-top: 1px solid #dfe2e9;
}

.at_flow_steps li {
  padding: 1.5rem 1.5rem 0 0;
  min-height: 190px;
  border-right: 1px solid #dfe2e9;

  &:last-child {
    border-right: 0;
  }

  span {
    display: block;
    color: var(--primary);
    font-size: 13px;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  h3 {
    color: #171717;
    font-size: 17px;
    font-weight: 700;
    margin: 0 0 0.7rem;
  }

  p {
    color: #5d626c;
    font-size: 13px;
    line-height: 1.65;
    margin: 0;
  }
}

.at_info {
  padding: 78px 0;
  background: #101725;
  color: #fff;
}

.at_info_grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 460px);
  gap: 4rem;
  align-items: center;

  h2 {
    color: #fff;
    font-size: 34px;
    line-height: 1.2;
    font-weight: 700;
    margin: 0 0 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.72);
    font-size: 15px;
    line-height: 1.75;
    margin: 0;
    max-width: 640px;
  }
}

.at_info_list {
  list-style: none;
  display: grid;
  gap: 0.8rem;
  margin: 0;
  padding: 0;
}

.at_info_list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;

  i {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #101725;
    background: #fff;
    flex-shrink: 0;
  }
}

.at_cta_inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  border-top: 1px solid #e6e8ee;
  border-bottom: 1px solid #e6e8ee;

  h2 {
    max-width: 640px;
    color: #151515;
    font-size: 32px;
    line-height: 1.22;
    font-weight: 700;
    margin: 0;
  }
}

@media (max-width: 1024px) {
  .at_support_grid,
  .at_info_grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .at_flow_steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .at_flow_steps li:nth-child(2) {
    border-right: 0;
  }

  .at_cta_inner {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .at_container {
    padding: 0 1rem;
  }

  .at_hero,
  .at_hero_overlay {
    min-height: 560px;
  }

  .at_hero_overlay {
    align-items: flex-end;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.18) 0%,
      rgba(0, 0, 0, 0.78) 100%
    );
  }

  .at_hero_content {
    padding-top: 4rem;
    padding-bottom: 3rem;
  }

  .at_hero_content h1 {
    font-size: 31px;
  }

  .at_section_header h2,
  .at_support_content h2,
  .at_info_grid h2,
  .at_cta_inner h2 {
    font-size: 26px;
  }

  .at_channels,
  .at_support,
  .at_flow,
  .at_info,
  .at_cta {
    padding: 56px 0;
  }

  .at_channels_grid,
  .at_topics,
  .at_flow_steps {
    grid-template-columns: 1fr;
  }

  .at_channel_card {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .at_flow_steps li,
  .at_flow_steps li:nth-child(2) {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid #dfe2e9;
    padding: 1.5rem 0;
  }

  .at_flow_steps li:last-child {
    border-bottom: 0;
  }

  .at_hero_actions,
  .at_cta_actions,
  .at_btn {
    width: 100%;
  }

  .at_hero_actions,
  .at_cta_actions {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 420px) {
  .at_hero,
  .at_hero_overlay {
    min-height: 520px;
  }

  .at_hero_content h1 {
    font-size: 27px;
  }
}
</style>
