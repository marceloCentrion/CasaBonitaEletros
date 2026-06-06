<template>
  <main id="page_faq" aria-labelledby="faq_heading">
    <section class="faq_hero" aria-label="Perguntas frequentes">
      <NuxtImg
        src="/images/hero1.jpg"
        alt="Cozinha sofisticada equipada com eletrodomésticos"
        class="faq_hero_img"
        preload
      />
      <div class="faq_hero_overlay">
        <div class="faq_container faq_hero_content">
          <span class="faq_tag">Perguntas e Respostas</span>
          <h1 id="faq_heading">Encontre respostas rápidas para comprar com segurança.</h1>
          <p>
            Reunimos as principais dúvidas sobre produtos, pedidos, entrega,
            pagamento, garantia e pós-venda em uma navegação simples e elegante.
          </p>
        </div>
      </div>
    </section>

    <nav class="faq_breadcrumb" aria-label="Você está em">
      <div class="faq_container faq_breadcrumb_inner">
        <NuxtLink to="/" class="faq_breadcrumb_link">Início</NuxtLink>
        <i class="bi bi-chevron-right" aria-hidden="true"></i>
        <span>Perguntas Frequentes</span>
      </div>
    </nav>

    <section class="faq_search_section" aria-labelledby="faq_search_heading">
      <div class="faq_container faq_search_grid">
        <div class="faq_search_copy">
          <span class="faq_tag faq_tag--dark">Atendimento inteligente</span>
          <h2 id="faq_search_heading">Procure por assunto ou navegue pelas categorias.</h2>
          <p>
            Digite uma palavra-chave ou selecione um tema para visualizar apenas
            as perguntas relacionadas.
          </p>
        </div>

        <div class="faq_search_panel">
          <label class="faq_search_label" for="faq_search">Buscar resposta</label>
          <div class="faq_search_box">
            <i class="bi bi-search" aria-hidden="true"></i>
            <input
              id="faq_search"
              v-model.trim="searchTerm"
              type="search"
              placeholder="Ex.: entrega, garantia, pagamento..."
            />
            <button
              v-if="searchTerm"
              type="button"
              aria-label="Limpar busca"
              @click="searchTerm = ''"
            >
              <i class="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </div>

          <div class="faq_category_list" aria-label="Filtrar perguntas por assunto">
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              class="faq_category_btn"
              :class="{ 'faq_category_btn--active': activeCategory === category }"
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="faq_content" aria-labelledby="faq_list_heading">
      <div class="faq_container faq_content_grid">
        <aside class="faq_sidebar" aria-label="Atalhos úteis">
          <span class="faq_sidebar_title">Também pode ajudar</span>
          <NuxtLink to="/atendimento" class="faq_sidebar_link">
            <i class="bi bi-headset" aria-hidden="true"></i>
            Central de Atendimento
          </NuxtLink>
          <NuxtLink to="/trocas-devolucoes" class="faq_sidebar_link">
            <i class="bi bi-arrow-repeat" aria-hidden="true"></i>
            Trocas e Devoluções
          </NuxtLink>
          <NuxtLink to="/prazo-entrega" class="faq_sidebar_link">
            <i class="bi bi-truck" aria-hidden="true"></i>
            Prazos de Entrega
          </NuxtLink>
          <NuxtLink to="/produtos" class="faq_sidebar_link">
            <i class="bi bi-grid" aria-hidden="true"></i>
            Ver Produtos
          </NuxtLink>
        </aside>

        <div class="faq_questions">
          <div class="faq_questions_header">
            <div>
              <span class="faq_tag faq_tag--dark">Dúvidas frequentes</span>
              <h2 id="faq_list_heading">Perguntas mais consultadas</h2>
            </div>
            <span class="faq_count">
              {{ filteredQuestions.length }}
              {{ filteredQuestions.length === 1 ? "resposta" : "respostas" }}
            </span>
          </div>

          <div v-if="isLoading" class="faq_loading" aria-live="polite">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div v-else-if="filteredQuestions.length" class="faq_accordion">
            <article
              v-for="item in filteredQuestions"
              :key="item.id"
              class="faq_item"
              :class="{ 'faq_item--open': openedId === item.id }"
            >
              <button
                type="button"
                class="faq_question_btn"
                :aria-expanded="openedId === item.id"
                :aria-controls="`faq_answer_${item.id}`"
                @click="toggleQuestion(item.id)"
              >
                <span class="faq_question_icon">
                  <i :class="item.icon" class="bi" aria-hidden="true"></i>
                </span>
                <span class="faq_question_text">
                  <small>{{ item.category }}</small>
                  {{ item.question }}
                </span>
                <i class="bi bi-chevron-down faq_question_arrow" aria-hidden="true"></i>
              </button>

              <Transition name="faq_answer">
                <div
                  v-show="openedId === item.id"
                  :id="`faq_answer_${item.id}`"
                  class="faq_answer"
                >
                  <p>{{ item.answer }}</p>
                </div>
              </Transition>
            </article>
          </div>

          <div v-else class="faq_empty">
            <i class="bi bi-search" aria-hidden="true"></i>
            <h3>Nenhuma resposta encontrada</h3>
            <p>
              Tente buscar por outra palavra ou fale com nossa equipe pela
              Central de Atendimento.
            </p>
            <NuxtLink to="/atendimento" class="faq_empty_link">
              Falar com atendimento
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="faq_cta" aria-labelledby="faq_cta_heading">
      <div class="faq_container faq_cta_inner">
        <div>
          <span class="faq_tag faq_tag--dark">Ainda com dúvida?</span>
          <h2 id="faq_cta_heading">Nossa equipe pode orientar você diretamente.</h2>
        </div>
        <div class="faq_cta_actions">
          <NuxtLink to="/atendimento" class="faq_btn faq_btn--primary">
            <i class="bi bi-headset" aria-hidden="true"></i>
            Ir para atendimento
          </NuxtLink>
          <NuxtLink to="/contato" class="faq_btn faq_btn--outline">
            <i class="bi bi-envelope" aria-hidden="true"></i>
            Enviar mensagem
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import services from "@/services/axios";

definePageMeta({ layout: "site" });

useHead({
  title: "Perguntas Frequentes | Casa Bonita Eletros",
  meta: [
    {
      name: "description",
      content:
        "Perguntas frequentes da Casa Bonita Eletros: respostas sobre compras, produtos, pagamento, entrega, trocas, devoluções e garantia.",
    },
  ],
});

const searchTerm = ref("");
const activeCategory = ref("Todas");
const openedId = ref("faq-1");
const isLoading = ref(false);

const state = reactive({
  questions: [],
});

const fallbackQuestions = [
  {
    id: "faq-1",
    category: "Compras",
    icon: "bi-bag-check",
    question: "Como escolher o produto ideal para minha cozinha?",
    answer:
      "Nossa recomendação é considerar medidas disponíveis, tipo de uso, acabamento desejado e recursos essenciais. Se precisar, fale com a equipe da Casa Bonita Eletros para receber uma orientação mais assertiva antes da compra.",
  },
  {
    id: "faq-2",
    category: "Produtos",
    icon: "bi-stars",
    question: "Os produtos possuem garantia?",
    answer:
      "Sim. Os produtos comercializados pela Casa Bonita Eletros contam com garantia legal e, quando aplicável, garantia contratual do fabricante. O prazo pode variar conforme marca, modelo e categoria do produto.",
  },
  {
    id: "faq-3",
    category: "Entrega",
    icon: "bi-truck",
    question: "Como acompanho a entrega do meu pedido?",
    answer:
      "Após a confirmação e despacho, você recebe as informações de acompanhamento disponíveis para o pedido. Em caso de dúvida sobre prazo, status ou endereço de entrega, a Central de Atendimento pode auxiliar.",
  },
  {
    id: "faq-4",
    category: "Pagamento",
    icon: "bi-credit-card",
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "As formas disponíveis podem variar conforme o produto e o checkout. Normalmente, a loja trabalha com cartão, PIX e condições parceladas quando habilitadas para o pedido.",
  },
  {
    id: "faq-5",
    category: "Trocas",
    icon: "bi-arrow-repeat",
    question: "Posso trocar ou devolver uma compra feita pelo site?",
    answer:
      "Sim. Para compras online, o direito de arrependimento pode ser solicitado em até 7 dias corridos após o recebimento. O produto deve retornar sem sinais de uso, com embalagem original, nota fiscal e acessórios.",
  },
  {
    id: "faq-6",
    category: "Garantia",
    icon: "bi-shield-check",
    question: "O que fazer se meu produto apresentar defeito?",
    answer:
      "Entre em contato com a Central de Atendimento informando número do pedido, nota fiscal, fotos ou vídeo do problema. A equipe orientará o encaminhamento adequado com fabricante ou assistência autorizada.",
  },
  {
    id: "faq-7",
    category: "Entrega",
    icon: "bi-box-seam",
    question: "O que devo conferir no recebimento?",
    answer:
      "Verifique se a embalagem está íntegra antes de assinar o recebimento. Caso perceba avaria, violação ou sinais de impacto, recuse a entrega e informe a equipe de atendimento o quanto antes.",
  },
  {
    id: "faq-8",
    category: "Atendimento",
    icon: "bi-headset",
    question: "Qual é o canal mais rápido para falar com a loja?",
    answer:
      "O WhatsApp costuma ser o canal mais ágil para dúvidas rápidas, acompanhamento de pedido e orientações iniciais. A página de Central de Atendimento reúne os canais oficiais da Casa Bonita Eletros.",
  },
];

onMounted(() => {
  fetchPerguntas();
});

async function fetchPerguntas() {
  try {
    isLoading.value = true;
    const { data } = await services.perguntas.getAllSite();
    const list = Array.isArray(data) ? data : data?.data || [];
    const normalized = list
      .filter((item) => item?.pergunta && item?.resposta)
      .map((item, index) => ({
        id: `api-${item.id || index}`,
        category: item.categoria || "Geral",
        icon: "bi-chat-square-text",
        question: item.pergunta,
        answer: item.resposta,
      }));

    state.questions = normalized.length ? normalized : fallbackQuestions;
  } catch (error) {
    console.error("Erro ao buscar perguntas frequentes:", error);
    state.questions = fallbackQuestions;
  } finally {
    isLoading.value = false;
  }
}

const categories = computed(() => {
  const uniqueCategories = state.questions.map((item) => item.category);
  return ["Todas", ...new Set(uniqueCategories)];
});

const filteredQuestions = computed(() => {
  const term = searchTerm.value.toLowerCase();

  return state.questions.filter((item) => {
    const matchCategory =
      activeCategory.value === "Todas" || item.category === activeCategory.value;
    const searchable = `${item.question} ${item.answer} ${item.category}`.toLowerCase();
    const matchTerm = !term || searchable.includes(term);

    return matchCategory && matchTerm;
  });
});

watch(filteredQuestions, (questions) => {
  if (!questions.length) {
    openedId.value = null;
    return;
  }

  if (!questions.some((item) => item.id === openedId.value)) {
    openedId.value = questions[0].id;
  }
});

function toggleQuestion(id) {
  openedId.value = openedId.value === id ? null : id;
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

#page_faq {
  background: #fff;
  color: #1a1a1a;
}

.faq_container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.faq_hero {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #111;
}

.faq_hero_img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.faq_hero_overlay {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.78) 0%,
    rgba(0, 0, 0, 0.5) 56%,
    rgba(0, 0, 0, 0.08) 100%
  );
}

.faq_hero_content {
  max-width: 760px;
  color: #fff;
  padding-top: 5rem;
  padding-bottom: 5rem;

  h1 {
    font-size: 42px;
    line-height: 1.15;
    font-weight: 700;
    margin: 0 0 1.25rem;
  }

  p {
    max-width: 650px;
    color: rgba(255, 255, 255, 0.86);
    font-size: 15px;
    line-height: 1.75;
    margin: 0;
  }
}

.faq_tag {
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

.faq_tag--dark {
  color: $primary;
  border-color: rgba(7, 22, 60, 0.18);
  background: rgba(7, 22, 60, 0.04);
}

.faq_breadcrumb {
  border-bottom: 1px solid #e8e8e8;
  background: #fafafa;
}

.faq_breadcrumb_inner {
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

.faq_breadcrumb_link {
  color: #555;
  text-decoration: none;

  &:hover {
    color: $primary;
  }
}

.faq_search_section {
  padding: 70px 0;
  background: #fff;
}

.faq_search_grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
  gap: 4rem;
  align-items: center;
}

.faq_search_copy h2,
.faq_questions_header h2,
.faq_cta h2 {
  color: #151515;
  font-size: 32px;
  line-height: 1.22;
  font-weight: 700;
  margin: 0;
}

.faq_search_copy p {
  color: #53565f;
  font-size: 15px;
  line-height: 1.75;
  margin: 1rem 0 0;
  max-width: 560px;
}

.faq_search_panel {
  border: 1px solid #e6e8ee;
  border-radius: 8px;
  padding: 1.5rem;
  background: #f7f7f8;
}

.faq_search_label {
  display: block;
  color: #171717;
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.faq_search_box {
  display: grid;
  grid-template-columns: 22px 1fr 32px;
  align-items: center;
  gap: 0.65rem;
  min-height: 52px;
  border: 1px solid #dfe2e9;
  border-radius: 8px;
  padding: 0 0.8rem;
  background: #fff;

  > i {
    color: #7a808c;
  }

  input {
    width: 100%;
    border: 0;
    outline: 0;
    color: #171717;
    background: transparent;
    font-size: 14px;

    &::placeholder {
      color: #9aa0aa;
    }
  }

  button {
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #f1f2f5;
    color: #4f5562;
    cursor: pointer;

    &:hover {
      background: $primary;
      color: #fff;
    }
  }
}

.faq_category_list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.faq_category_btn {
  border: 1px solid #d4d8e1;
  border-radius: 999px;
  padding: 8px 14px;
  background: #fff;
  color: #4f5562;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.18s,
    border-color 0.18s,
    color 0.18s;

  &:hover,
  &--active {
    background: $primary;
    border-color: $primary;
    color: #fff;
  }
}

.faq_content {
  padding: 72px 0 88px;
  background: #f7f7f8;
}

.faq_content_grid {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
}

.faq_sidebar {
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

.faq_sidebar_title {
  color: #8a8d96;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.faq_sidebar_link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #4f5562;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 6px;
  padding: 9px 10px;
  transition:
    background 0.16s,
    color 0.16s;

  i {
    color: $primary;
  }

  &:hover {
    background: $primary;
    color: #fff;

    i {
      color: #fff;
    }
  }
}

.faq_questions {
  min-width: 0;
}

.faq_questions_header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.faq_count {
  border: 1px solid #e2e4ea;
  border-radius: 999px;
  padding: 8px 14px;
  background: #fff;
  color: #4f5562;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
}

.faq_accordion {
  display: grid;
  gap: 0.85rem;
}

.faq_item {
  border: 1px solid #e2e4ea;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
  transition:
    border-color 0.18s,
    box-shadow 0.18s;

  &--open {
    border-color: rgba(7, 22, 60, 0.28);
    box-shadow: 0 18px 40px rgba(18, 26, 43, 0.08);
  }
}

.faq_question_btn {
  width: 100%;
  display: grid;
  grid-template-columns: 44px 1fr 34px;
  gap: 1rem;
  align-items: center;
  border: 0;
  background: #fff;
  padding: 1.1rem 1.25rem;
  text-align: left;
  cursor: pointer;
}

.faq_question_icon {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f3f5f8;
  color: $primary;
  font-size: 18px;
}

.faq_question_text {
  color: #151515;
  font-size: 16px;
  line-height: 1.35;
  font-weight: 800;

  small {
    display: block;
    color: #7a808c;
    font-size: 12px;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }
}

.faq_question_arrow {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #7a808c;
  background: #f6f7f9;
  transition:
    transform 0.2s,
    background 0.2s,
    color 0.2s;

  .faq_item--open & {
    transform: rotate(180deg);
    background: $primary;
    color: #fff;
  }
}

.faq_answer {
  padding: 0 1.25rem 1.25rem 5.9rem;

  p {
    border-top: 1px solid #edf0f4;
    padding-top: 1rem;
    color: #535965;
    font-size: 14px;
    line-height: 1.75;
    margin: 0;
    white-space: pre-line;
  }
}

.faq_answer-enter-active,
.faq_answer-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.faq_answer-enter-from,
.faq_answer-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.faq_loading {
  display: flex;
  justify-content: center;
  gap: 0.45rem;
  padding: 3rem 0;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $primary;
    animation: faqPulse 0.75s ease-in-out infinite alternate;
  }

  span:nth-child(2) {
    animation-delay: 0.15s;
  }

  span:nth-child(3) {
    animation-delay: 0.3s;
  }
}

@keyframes faqPulse {
  from {
    opacity: 0.35;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    transform: translateY(-6px);
  }
}

.faq_empty {
  border: 1px solid #e2e4ea;
  border-radius: 8px;
  padding: 2rem;
  background: #fff;
  text-align: center;

  > i {
    color: $primary;
    font-size: 30px;
  }

  h3 {
    color: #151515;
    font-size: 20px;
    font-weight: 800;
    margin: 1rem 0 0.5rem;
  }

  p {
    color: #5d626c;
    font-size: 14px;
    line-height: 1.65;
    margin: 0 auto 1.25rem;
    max-width: 420px;
  }
}

.faq_empty_link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border-radius: 8px;
  padding: 10px 18px;
  background: $primary;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
}

.faq_cta {
  padding: 76px 0;
  background: #fff;
}

.faq_cta_inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  border-top: 1px solid #e6e8ee;
  border-bottom: 1px solid #e6e8ee;
}

.faq_cta h2 {
  max-width: 620px;
}

.faq_cta_actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.faq_btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 12px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 800;
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

.faq_btn--primary {
  background: $primary;
  border: 1px solid $primary;
  color: #fff;

  &:hover {
    background: #111;
    border-color: #111;
  }
}

.faq_btn--outline {
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
  .faq_search_grid,
  .faq_content_grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .faq_sidebar {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .faq_sidebar_title {
    grid-column: 1 / -1;
  }

  .faq_cta_inner {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .faq_container {
    padding: 0 1rem;
  }

  .faq_hero,
  .faq_hero_overlay {
    min-height: 520px;
  }

  .faq_hero_overlay {
    align-items: flex-end;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.18) 0%,
      rgba(0, 0, 0, 0.78) 100%
    );
  }

  .faq_hero_content {
    padding-top: 4rem;
    padding-bottom: 3rem;
  }

  .faq_hero_content h1 {
    font-size: 31px;
  }

  .faq_search_copy h2,
  .faq_questions_header h2,
  .faq_cta h2 {
    font-size: 26px;
  }

  .faq_search_section,
  .faq_content,
  .faq_cta {
    padding: 56px 0;
  }

  .faq_questions_header {
    align-items: flex-start;
    flex-direction: column;
  }

  .faq_sidebar {
    grid-template-columns: 1fr;
  }

  .faq_question_btn {
    grid-template-columns: 40px 1fr 30px;
    gap: 0.8rem;
    padding: 1rem;
  }

  .faq_question_icon {
    width: 40px;
    height: 40px;
  }

  .faq_answer {
    padding: 0 1rem 1rem;
  }

  .faq_cta_actions,
  .faq_btn {
    width: 100%;
  }

  .faq_cta_actions {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 420px) {
  .faq_hero,
  .faq_hero_overlay {
    min-height: 480px;
  }

  .faq_hero_content h1 {
    font-size: 27px;
  }

  .faq_search_box {
    grid-template-columns: 20px 1fr 30px;
  }
}
</style>
