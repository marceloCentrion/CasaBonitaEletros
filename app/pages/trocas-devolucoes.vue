<template>
  <main id="page_trocas" aria-labelledby="trocas_heading">
    <section class="td_hero" aria-label="Trocas e devoluções">
      <NuxtImg
        src="/images/hero1.jpg"
        alt="Cozinha sofisticada equipada com eletrodomésticos"
        class="td_hero_img"
        preload
      />
      <div class="td_hero_overlay">
        <div class="td_container td_hero_content">
          <span class="td_tag">Política de atendimento</span>
          <h1 id="trocas_heading">Trocas e Devoluções</h1>
          <p>
            Um processo claro para que você compre com tranquilidade: prazos,
            condições, reembolso e orientação para cada etapa.
          </p>
        </div>
      </div>
    </section>

    <nav class="td_breadcrumb" aria-label="Você está em">
      <div class="td_container td_breadcrumb_inner">
        <NuxtLink to="/" class="td_breadcrumb_link">Início</NuxtLink>
        <i class="bi bi-chevron-right" aria-hidden="true"></i>
        <span>Trocas e Devoluções</span>
      </div>
    </nav>

    <section class="td_summary" aria-label="Resumo da política">
      <div class="td_container">
        <ul class="td_summary_grid">
          <li v-for="item in highlights" :key="item.title" class="td_summary_item">
            <span class="td_summary_icon">
              <i :class="item.icon" class="bi" aria-hidden="true"></i>
            </span>
            <h2>{{ item.title }}</h2>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="td_policy" aria-labelledby="policy_heading">
      <div class="td_container td_policy_grid">
        <aside class="td_index" aria-label="Índice da política">
          <span class="td_index_title">Nesta página</span>
          <a
            v-for="link in indexLinks"
            :key="link.href"
            :href="link.href"
            class="td_index_link"
          >
            {{ link.label }}
          </a>
        </aside>

        <div class="td_policy_content">
          <div class="td_policy_intro" id="visao-geral">
            <span class="td_tag td_tag--dark">Visão geral</span>
            <h2 id="policy_heading">Antes de solicitar, confira os pontos principais.</h2>
            <p>
              Para compras feitas pelo site, o direito de arrependimento pode
              ser solicitado em até 7 dias corridos a partir do recebimento. Em
              caso de defeito, avaliamos o produto conforme as regras de
              garantia legal e garantia do fabricante.
            </p>
          </div>

          <article class="td_block" id="arrependimento">
            <header class="td_block_header">
              <span class="td_block_icon">
                <i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i>
              </span>
              <div>
                <span class="td_block_kicker">Compras online</span>
                <h2>Direito de arrependimento em até 7 dias</h2>
              </div>
            </header>
            <div class="td_block_body">
              <p>
                Se você comprou pelo site e desistiu da compra, solicite a
                devolução em até <strong>7 dias corridos</strong> após o
                recebimento do produto.
              </p>
              <p>
                O produto deve retornar sem sinais de uso, na embalagem original
                e acompanhado de nota fiscal, manuais, acessórios e itens que
                tenham sido enviados junto ao pedido.
              </p>
              <div class="td_notice td_notice--info">
                <i class="bi bi-info-circle" aria-hidden="true"></i>
                <span>
                  O prazo começa a contar a partir da data de entrega registrada
                  pela transportadora.
                </span>
              </div>
            </div>
          </article>

          <article class="td_block" id="como-solicitar">
            <header class="td_block_header">
              <span class="td_block_icon">
                <i class="bi bi-list-check" aria-hidden="true"></i>
              </span>
              <div>
                <span class="td_block_kicker">Passo a passo</span>
                <h2>Como solicitar troca ou devolução</h2>
              </div>
            </header>
            <div class="td_block_body">
              <ol class="td_steps">
                <li v-for="step in requestSteps" :key="step.title">
                  <span>{{ step.number }}</span>
                  <div>
                    <h3>{{ step.title }}</h3>
                    <p>{{ step.text }}</p>
                  </div>
                </li>
              </ol>
            </div>
          </article>

          <article class="td_block" id="condicoes">
            <header class="td_block_header">
              <span class="td_block_icon">
                <i class="bi bi-patch-check" aria-hidden="true"></i>
              </span>
              <div>
                <span class="td_block_kicker">Conferência</span>
                <h2>Condições para aceite do produto</h2>
              </div>
            </header>
            <div class="td_block_body">
              <ul class="td_checklist">
                <li v-for="condition in acceptConditions" :key="condition">
                  <i class="bi bi-check-circle" aria-hidden="true"></i>
                  {{ condition }}
                </li>
              </ul>
            </div>
          </article>

          <article class="td_block" id="nao-aceitos">
            <header class="td_block_header">
              <span class="td_block_icon td_block_icon--danger">
                <i class="bi bi-x-circle" aria-hidden="true"></i>
              </span>
              <div>
                <span class="td_block_kicker">Atenção</span>
                <h2>Situações que impedem a troca ou devolução</h2>
              </div>
            </header>
            <div class="td_block_body">
              <ul class="td_checklist td_checklist--danger">
                <li v-for="item in notAccepted" :key="item">
                  <i class="bi bi-x-circle" aria-hidden="true"></i>
                  {{ item }}
                </li>
              </ul>
              <div class="td_notice td_notice--warning">
                <i class="bi bi-exclamation-triangle" aria-hidden="true"></i>
                <span>
                  Produtos instalados, usados ou com indícios de mau uso passam
                  por análise técnica antes de qualquer aprovação.
                </span>
              </div>
            </div>
          </article>

          <article class="td_block" id="defeito-garantia">
            <header class="td_block_header">
              <span class="td_block_icon">
                <i class="bi bi-shield-check" aria-hidden="true"></i>
              </span>
              <div>
                <span class="td_block_kicker">Garantia</span>
                <h2>Produto com defeito ou vício aparente</h2>
              </div>
            </header>
            <div class="td_block_body">
              <p>
                Para produtos duráveis, como eletrodomésticos, a reclamação por
                vício aparente deve ser feita em até
                <strong>90 dias</strong>. A garantia contratual do fabricante é
                complementar à garantia legal e pode variar conforme marca e
                modelo.
              </p>
              <p>
                Ao acionar o atendimento, envie fotos, vídeo do problema quando
                possível, número do pedido e nota fiscal. Nossa equipe orienta o
                próximo passo com o fabricante ou assistência autorizada.
              </p>
            </div>
          </article>

          <article class="td_block" id="reembolso">
            <header class="td_block_header">
              <span class="td_block_icon">
                <i class="bi bi-credit-card" aria-hidden="true"></i>
              </span>
              <div>
                <span class="td_block_kicker">Valores</span>
                <h2>Como funciona o reembolso</h2>
              </div>
            </header>
            <div class="td_block_body">
              <p>
                Depois que o produto retorna e a análise é aprovada, o reembolso
                é solicitado conforme a forma de pagamento utilizada no pedido.
              </p>
              <div class="td_table_wrap">
                <table class="td_table" aria-label="Prazos de reembolso">
                  <thead>
                    <tr>
                      <th>Forma de pagamento</th>
                      <th>Tratativa</th>
                      <th>Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in refundRows" :key="row.method">
                      <td>{{ row.method }}</td>
                      <td>{{ row.time }}</td>
                      <td>{{ row.note }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>

          <article class="td_block" id="recebimento">
            <header class="td_block_header">
              <span class="td_block_icon">
                <i class="bi bi-box-seam" aria-hidden="true"></i>
              </span>
              <div>
                <span class="td_block_kicker">Na entrega</span>
                <h2>Cuidados ao receber o produto</h2>
              </div>
            </header>
            <div class="td_block_body">
              <p>
                Antes de assinar o recebimento, confira a embalagem. Caso note
                avaria, violação de lacre ou sinais de impacto, recuse a entrega
                e registre o motivo com a transportadora.
              </p>
              <ul class="td_checklist">
                <li v-for="item in deliveryCare" :key="item">
                  <i class="bi bi-check-circle" aria-hidden="true"></i>
                  {{ item }}
                </li>
              </ul>
            </div>
          </article>

          <section class="td_cta" id="contato" aria-label="Atendimento">
            <div>
              <span class="td_tag td_tag--dark">Atendimento</span>
              <h2>Ainda precisa de ajuda com sua solicitação?</h2>
              <p>
                Fale com nossa equipe e informe o número do pedido para
                agilizar o atendimento.
              </p>
            </div>
            <div class="td_cta_actions">
              <NuxtLink to="/contato" class="td_btn td_btn--primary">
                <i class="bi bi-chat-dots" aria-hidden="true"></i>
                Falar com atendimento
              </NuxtLink>
              <NuxtLink to="/produtos" class="td_btn td_btn--outline">
                <i class="bi bi-bag-check" aria-hidden="true"></i>
                Voltar aos produtos
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
definePageMeta({ layout: "site" });

useHead({
  title: "Trocas e Devoluções | Casa Bonita Eletros",
  meta: [
    {
      name: "description",
      content:
        "Consulte a política de trocas e devoluções da Casa Bonita Eletros: prazos, condições de aceite, garantia, reembolso e atendimento.",
    },
  ],
});

const highlights = [
  {
    icon: "bi-calendar-check",
    title: "7 dias corridos",
    text: "Prazo para arrependimento em compras realizadas pelo site.",
  },
  {
    icon: "bi-shield-check",
    title: "Garantia legal",
    text: "Produtos duráveis seguem o prazo legal para vícios aparentes.",
  },
  {
    icon: "bi-search",
    title: "Análise técnica",
    text: "O produto retornado passa por conferência antes da aprovação.",
  },
  {
    icon: "bi-headset",
    title: "Atendimento próximo",
    text: "Nossa equipe orienta cada etapa da solicitação.",
  },
];

const indexLinks = [
  { href: "#visao-geral", label: "Visão geral" },
  { href: "#arrependimento", label: "Arrependimento" },
  { href: "#como-solicitar", label: "Como solicitar" },
  { href: "#condicoes", label: "Condições" },
  { href: "#nao-aceitos", label: "Não aceitos" },
  { href: "#defeito-garantia", label: "Defeito e garantia" },
  { href: "#reembolso", label: "Reembolso" },
  { href: "#recebimento", label: "Recebimento" },
];

const requestSteps = [
  {
    number: "01",
    title: "Entre em contato",
    text: "Envie número do pedido, nota fiscal, fotos do produto e motivo da solicitação.",
  },
  {
    number: "02",
    title: "Aguarde a orientação",
    text: "Nossa equipe confere os dados e retorna com as instruções de envio ou coleta.",
  },
  {
    number: "03",
    title: "Prepare o produto",
    text: "Embale na caixa original com acessórios, manuais e todos os itens recebidos.",
  },
  {
    number: "04",
    title: "Análise e conclusão",
    text: "Após o recebimento, avaliamos as condições e seguimos com troca, crédito ou reembolso.",
  },
];

const acceptConditions = [
  "Produto na embalagem original, preferencialmente intacta.",
  "Nota fiscal, manuais, acessórios e brindes enviados junto ao pedido.",
  "Ausência de sinais de uso, instalação indevida, queda ou avaria causada pelo cliente.",
  "Número de série e etiquetas do fabricante preservados.",
  "Solicitação aberta dentro do prazo aplicável ao caso.",
];

const notAccepted = [
  "Produto com uso evidente, danos físicos ou sinais de instalação incorreta.",
  "Itens sem embalagem, acessórios, manuais ou nota fiscal.",
  "Solicitação fora do prazo legal ou sem informações suficientes para análise.",
  "Violação de lacres, etiquetas ou número de série.",
  "Danos causados por mau uso, transporte próprio ou armazenamento inadequado.",
];

const refundRows = [
  {
    method: "Cartão de crédito",
    time: "Estorno solicitado à operadora",
    note: "O crédito pode aparecer em até duas faturas, conforme emissor.",
  },
  {
    method: "PIX",
    time: "Devolução para a chave ou conta informada",
    note: "Processado após aprovação da análise interna.",
  },
  {
    method: "Boleto ou transferência",
    time: "Depósito em conta do titular da compra",
    note: "Os dados bancários devem pertencer ao comprador.",
  },
];

const deliveryCare = [
  "Confira se a embalagem está íntegra antes de assinar o recebimento.",
  "Em caso de avaria aparente, recuse a entrega e registre o motivo.",
  "Fotografe embalagem e produto caso perceba dano após o recebimento.",
  "Acione o atendimento o quanto antes para abertura da ocorrência.",
];
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

#page_trocas {
  background: #fff;
  color: #1a1a1a;
}

.td_container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.td_hero {
  position: relative;
  min-height: 360px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #111;
}

.td_hero_img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.td_hero_overlay {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 360px;
  display: flex;
  align-items: center;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.76) 0%,
    rgba(0, 0, 0, 0.46) 58%,
    rgba(0, 0, 0, 0.1) 100%
  );
}

.td_hero_content {
  color: #fff;
  max-width: 720px;

  h1 {
    font-size: 42px;
    line-height: 1.15;
    font-weight: 700;
    margin: 0 0 1rem;
  }

  p {
    max-width: 620px;
    color: rgba(255, 255, 255, 0.86);
    font-size: 15px;
    line-height: 1.75;
    margin: 0;
  }
}

.td_tag {
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

.td_tag--dark {
  color: var(--primary);
  border-color: rgba(7, 22, 60, 0.18);
  background: rgba(7, 22, 60, 0.04);
}

.td_breadcrumb {
  border-bottom: 1px solid #e8e8e8;
  background: #fafafa;
}

.td_breadcrumb_inner {
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

.td_breadcrumb_link {
  color: #555;
  text-decoration: none;

  &:hover {
    color: var(--primary);
  }
}

.td_summary {
  padding: 58px 0;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
}

.td_summary_grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.td_summary_item {
  border: 1px solid #e6e8ee;
  border-radius: 8px;
  min-height: 210px;
  padding: 1.4rem;
  background: #fff;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;

  &:hover {
    border-color: rgba(7, 22, 60, 0.28);
    box-shadow: 0 18px 40px rgba(18, 26, 43, 0.08);
    transform: translateY(-3px);
  }

  h2 {
    font-size: 16px;
    font-weight: 700;
    margin: 1rem 0 0.65rem;
    color: #171717;
  }

  p {
    color: #5d626c;
    font-size: 13px;
    line-height: 1.6;
    margin: 0;
  }
}

.td_summary_icon,
.td_block_icon {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: #fff;
  font-size: 18px;
  flex-shrink: 0;
}

.td_policy {
  padding: 70px 0 96px;
  background: #f7f7f8;
}

.td_policy_grid {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
}

.td_index {
  position: sticky;
  top: 96px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid #e2e4ea;
  border-radius: 8px;
  padding: 1rem;
  background: #fff;
}

.td_index_title {
  color: #8a8d96;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.td_index_link {
  color: #4f5562;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  padding: 8px 10px;
  transition:
    background 0.16s,
    color 0.16s;

  &:hover {
    background: var(--primary);
    color: #fff;
  }
}

.td_policy_content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.td_policy_intro,
.td_block,
.td_cta {
  border: 1px solid #e2e4ea;
  border-radius: 8px;
  background: #fff;
}

.td_policy_intro {
  padding: 2rem;

  h2 {
    max-width: 720px;
    color: #151515;
    font-size: 30px;
    line-height: 1.24;
    font-weight: 700;
    margin: 0 0 1rem;
  }

  p {
    max-width: 780px;
    color: #535965;
    font-size: 15px;
    line-height: 1.75;
    margin: 0;
  }
}

.td_block {
  overflow: hidden;
}

.td_block_header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.35rem 1.5rem;
  border-bottom: 1px solid #e8eaf0;
  background: #fbfbfc;

  h2 {
    color: #171717;
    font-size: 18px;
    line-height: 1.35;
    font-weight: 700;
    margin: 0;
  }
}

.td_block_icon--danger {
  background: #c62828;
}

.td_block_kicker {
  display: block;
  color: #7a808c;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.td_block_body {
  padding: 1.5rem;

  p {
    color: #4f5562;
    font-size: 14px;
    line-height: 1.75;
    margin: 0 0 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: #151515;
  }
}

.td_notice {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  border-radius: 8px;
  padding: 1rem;
  font-size: 13px;
  line-height: 1.6;
  margin-top: 1rem;

  i {
    flex-shrink: 0;
    margin-top: 2px;
  }
}

.td_notice--info {
  color: #155a98;
  background: #e8f3ff;
}

.td_notice--warning {
  color: #775500;
  background: #fff7df;
}

.td_steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin: 0;
  padding: 0;
  border-top: 1px solid #e2e4ea;
}

.td_steps li {
  padding: 1.25rem 1.25rem 0 0;
  border-right: 1px solid #e2e4ea;
  min-height: 190px;

  &:last-child {
    border-right: 0;
  }

  > span {
    display: block;
    color: var(--primary);
    font-size: 13px;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  h3 {
    color: #171717;
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 0.6rem;
  }

  p {
    color: #5d626c;
    font-size: 13px;
    line-height: 1.6;
    margin: 0;
  }
}

.td_checklist {
  list-style: none;
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    color: #4f5562;
    font-size: 14px;
    line-height: 1.55;
  }

  i {
    color: #24853f;
    font-size: 16px;
    line-height: 1.55;
    flex-shrink: 0;
  }
}

.td_checklist--danger i {
  color: #c62828;
}

.td_table_wrap {
  overflow-x: auto;
  border: 1px solid #e2e4ea;
  border-radius: 8px;
}

.td_table {
  width: 100%;
  min-width: 680px;
  border-collapse: collapse;
  font-size: 13px;

  thead {
    background: #f3f4f7;
  }

  th,
  td {
    padding: 13px 15px;
    text-align: left;
    border-bottom: 1px solid #eceef3;
  }

  th {
    color: #303747;
    font-weight: 800;
  }

  td {
    color: #535965;
    line-height: 1.5;
  }

  tr:last-child td {
    border-bottom: 0;
  }
}

.td_cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem;

  h2 {
    color: #151515;
    font-size: 26px;
    line-height: 1.25;
    font-weight: 700;
    margin: 0 0 0.75rem;
  }

  p {
    color: #5d626c;
    font-size: 14px;
    line-height: 1.65;
    margin: 0;
  }
}

.td_cta_actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.td_btn {
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  padding: 12px 20px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  transition:
    background 0.18s,
    border-color 0.18s,
    color 0.18s,
    transform 0.18s;

  &:hover {
    transform: translateY(-2px);
  }
}

.td_btn--primary {
  background: var(--primary);
  border: 1px solid var(--primary);
}

.td_btn--outline {
  background: #fff;
  border: 1px solid #cfd3dc;
  color: #17213a;

  &:hover {
    background: #17213a;
    border-color: #17213a;
    color: #fff;
  }
}

@media (max-width: 1024px) {
  .td_summary_grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .td_policy_grid {
    grid-template-columns: 1fr;
  }

  .td_index {
    position: static;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .td_index_title {
    grid-column: 1 / -1;
  }

  .td_steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .td_steps li:nth-child(2) {
    border-right: 0;
  }

  .td_cta {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .td_container {
    padding: 0 1rem;
  }

  .td_hero,
  .td_hero_overlay {
    min-height: 330px;
  }

  .td_hero_overlay {
    align-items: flex-end;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.18) 0%,
      rgba(0, 0, 0, 0.78) 100%
    );
  }

  .td_hero_content {
    padding-bottom: 2.25rem;
  }

  .td_hero_content h1 {
    font-size: 31px;
  }

  .td_summary,
  .td_policy {
    padding: 48px 0;
  }

  .td_index {
    display: none;
  }

  .td_policy_intro,
  .td_block_body,
  .td_cta {
    padding: 1.25rem;
  }

  .td_block_header {
    align-items: flex-start;
    padding: 1.25rem;
  }

  .td_policy_intro h2,
  .td_cta h2 {
    font-size: 24px;
  }

  .td_cta_actions,
  .td_btn {
    width: 100%;
  }
}

@media (max-width: 540px) {
  .td_summary_grid,
  .td_steps {
    grid-template-columns: 1fr;
  }

  .td_summary_item {
    min-height: auto;
  }

  .td_steps li,
  .td_steps li:nth-child(2) {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid #e2e4ea;
    padding: 1.25rem 0;
  }

  .td_steps li:last-child {
    border-bottom: 0;
  }
}
</style>
