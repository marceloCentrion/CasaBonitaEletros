<template>
  <main id="page_quem_somos" aria-labelledby="qs_heading">
    <section class="qs_hero" aria-label="Quem Somos Casa Bonita Eletros">
      <NuxtImg
        src="/images/hero1.jpg"
        alt="Cozinha contemporânea com eletrodomésticos premium"
        class="qs_hero_img"
        preload
      />
      <div class="qs_hero_overlay">
        <div class="qs_container qs_hero_content">
          <span class="qs_eyebrow">Quem Somos</span>
          <h1 id="qs_heading">
            Curadoria para cozinhas que unem performance, beleza e presença.
          </h1>
          <p>
            A Casa Bonita Eletros nasceu para atender quem enxerga a cozinha como o
            centro da casa: um ambiente de encontro, preparo, tecnologia e
            acabamento impecável.
          </p>
          <div class="qs_hero_actions">
            <NuxtLink to="/produtos" class="qs_btn qs_btn--light">
              <i class="bi bi-grid" aria-hidden="true"></i>
              Ver produtos
            </NuxtLink>
            <NuxtLink to="/contato" class="qs_btn qs_btn--outline">
              <i class="bi bi-chat-dots" aria-hidden="true"></i>
              Fale conosco
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="qs_intro">
      <div class="qs_container qs_intro_grid">
        <div class="qs_intro_heading">
          <span class="qs_section_kicker">Nossa essência</span>
          <h2>Escolher bem transforma a rotina.</h2>
        </div>
        <div class="qs_intro_copy">
          <p>
            Reunimos eletrodomésticos, soluções e marcas que combinam design
            sofisticado, durabilidade e desempenho para cozinhas de alto
            padrão.
          </p>
          <p>
            Nosso papel é simplificar decisões importantes: entendemos o
            projeto, orientamos a escolha e aproximamos cada cliente do produto
            certo para o seu espaço.
          </p>
        </div>
      </div>

      <div class="qs_container">
        <dl class="qs_stats" aria-label="Diferenciais da Casa Bonita Eletros">
          <div v-for="item in stats" :key="item.label" class="qs_stat">
            <dt>{{ item.value }}</dt>
            <dd>{{ item.label }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="qs_story" aria-labelledby="qs_story_heading">
      <div class="qs_container qs_story_grid">
        <figure class="qs_story_media">
          <NuxtImg
            src="/images/fogaoNewsletter.jpeg"
            alt="Fogão premium de acabamento refinado"
            class="qs_story_img"
            loading="lazy"
          />
        </figure>

        <div class="qs_story_content">
          <span class="qs_section_kicker">Como trabalhamos</span>
          <h2 id="qs_story_heading">
            Atendimento consultivo, olhar técnico e gosto pelo detalhe.
          </h2>
          <p>
            Uma cozinha bem equipada pede mais do que um catálogo bonito. Pede
            escuta, comparação honesta entre opções e uma seleção que respeite
            dimensões, uso diário, estética e investimento.
          </p>
          <ul class="qs_feature_list">
            <li v-for="feature in features" :key="feature.title">
              <i :class="feature.icon" class="bi" aria-hidden="true"></i>
              <div>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.text }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="qs_values" aria-labelledby="qs_values_heading">
      <div class="qs_container">
        <div class="qs_section_header">
          <span class="qs_section_kicker">Nossos valores</span>
          <h2 id="qs_values_heading">O que guia cada recomendação.</h2>
        </div>

        <ul class="qs_values_grid">
          <li v-for="value in values" :key="value.title" class="qs_value_item">
            <span class="qs_value_icon">
              <i :class="value.icon" class="bi" aria-hidden="true"></i>
            </span>
            <h3>{{ value.title }}</h3>
            <p>{{ value.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="qs_process" aria-labelledby="qs_process_heading">
      <div class="qs_container">
        <div class="qs_process_header">
          <span class="qs_section_kicker">Da escolha à entrega</span>
          <h2 id="qs_process_heading">
            Uma experiência pensada para dar segurança.
          </h2>
          <p>
            Acompanhamos o cliente com clareza em cada etapa, mantendo o foco no
            que precisa funcionar bem hoje e continuar impecável no futuro.
          </p>
        </div>

        <ol class="qs_process_steps">
          <li v-for="step in process" :key="step.title">
            <span>{{ step.number }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="qs_showcase" aria-labelledby="qs_showcase_heading">
      <div class="qs_container qs_showcase_grid">
        <div class="qs_showcase_content">
          <span class="qs_section_kicker qs_section_kicker--light">
            Seleção premium
          </span>
          <h2 id="qs_showcase_heading">
            Produtos escolhidos para compor cozinhas completas.
          </h2>
          <p>
            Fogões, fornos, refrigeradores, coifas, micro-ondas e soluções de
            apoio entram no nosso mix com um critério simples: precisam fazer
            sentido no projeto e elevar a experiência de uso.
          </p>
        </div>

        <ul class="qs_showcase_list">
          <li v-for="category in categories" :key="category">
            <i class="bi bi-check2" aria-hidden="true"></i>
            {{ category }}
          </li>
        </ul>
      </div>
    </section>

    <section class="qs_cta" aria-labelledby="qs_cta_heading">
      <div class="qs_container qs_cta_inner">
        <div>
          <span class="qs_section_kicker">Pronto para começar?</span>
          <h2 id="qs_cta_heading">
            Vamos encontrar a escolha certa para sua cozinha.
          </h2>
        </div>
        <div class="qs_cta_actions">
          <NuxtLink to="/produtos" class="qs_btn qs_btn--primary">
            <i class="bi bi-bag-check" aria-hidden="true"></i>
            Explorar coleções
          </NuxtLink>
          <NuxtLink to="/contato" class="qs_btn qs_btn--dark-outline">
            <i class="bi bi-envelope" aria-hidden="true"></i>
            Solicitar atendimento
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
definePageMeta({ layout: "site" });

useHead({
  title: "Quem Somos - Casa Bonita Eletros",
  meta: [
    {
      name: "description",
      content:
        "Conheça a Casa Bonita Eletros: curadoria de eletrodomésticos premium, atendimento consultivo e soluções sofisticadas para cozinhas completas.",
    },
  ],
});

const stats = [
  { value: "01", label: "curadoria criteriosa para cada projeto" },
  { value: "360", label: "visão completa da cozinha, do uso ao acabamento" },
  { value: "100%", label: "foco em atendimento claro, próximo e seguro" },
];

const features = [
  {
    icon: "bi-rulers",
    title: "Leitura do ambiente",
    text: "Consideramos medidas, rotina, instalação e estilo para orientar escolhas coerentes.",
  },
  {
    icon: "bi-stars",
    title: "Seleção refinada",
    text: "Priorizamos desempenho, acabamento, confiabilidade e presença visual.",
  },
  {
    icon: "bi-shield-check",
    title: "Compra com confiança",
    text: "Valorizamos informação precisa, suporte atento e relacionamento de longo prazo.",
  },
];

const values = [
  {
    icon: "bi-gem",
    title: "Sofisticação útil",
    text: "Beleza importa, mas sempre acompanhada de função, eficiência e conforto no dia a dia.",
  },
  {
    icon: "bi-person-check",
    title: "Atendimento próximo",
    text: "A conversa é consultiva, sem pressa e com orientação objetiva para cada necessidade.",
  },
  {
    icon: "bi-lightning-charge",
    title: "Performance",
    text: "Selecionamos produtos que entregam potência, precisão e durabilidade.",
  },
  {
    icon: "bi-house-heart",
    title: "Cuidado com o lar",
    text: "Cada recomendação considera o jeito de morar, receber e cozinhar de quem compra.",
  },
];

const process = [
  {
    number: "01",
    title: "Entender",
    text: "Ouvimos o objetivo, o estilo do espaço e os pontos técnicos do projeto.",
  },
  {
    number: "02",
    title: "Selecionar",
    text: "Apresentamos opções com critério, comparando uso, acabamento e investimento.",
  },
  {
    number: "03",
    title: "Orientar",
    text: "Ajudamos na decisão com informações claras sobre medidas, recursos e cuidados.",
  },
  {
    number: "04",
    title: "Acompanhar",
    text: "Mantemos suporte para que a experiência continue segura depois da compra.",
  },
];

const categories = [
  "Eletrodomésticos de embutir",
  "Fogões e fornos de alta performance",
  "Refrigeração para cozinhas completas",
  "Coifas, depuradores e soluções de apoio",
];
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

#page_quem_somos {
  background: #fff;
  color: #1a1a1a;
  overflow: hidden;
}

.qs_container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.qs_hero {
  position: relative;
  min-height: 68vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #111;
}

.qs_hero_img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.qs_hero_overlay {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 68vh;
  display: flex;
  align-items: center;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.78) 0%,
    rgba(0, 0, 0, 0.5) 54%,
    rgba(0, 0, 0, 0.08) 100%
  );
}

.qs_hero_content {
  max-width: 720px;
  color: #fff;
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.qs_eyebrow,
.qs_section_kicker {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border: 1px solid rgba(7, 22, 60, 0.18);
  border-radius: 999px;
  padding: 6px 14px;
  color: var(--primary);
  background: rgba(7, 22, 60, 0.04);
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 1rem;
}

.qs_eyebrow {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.qs_section_kicker--light {
  border-color: rgba(255, 255, 255, 0.26);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.qs_hero h1 {
  font-size: 44px;
  font-weight: 700;
  line-height: 1.14;
  margin: 0 0 1.25rem;
  max-width: 680px;
}

.qs_hero p {
  max-width: 620px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 16px;
  line-height: 1.75;
  margin: 0 0 2rem;
}

.qs_hero_actions,
.qs_cta_actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.qs_btn {
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
    background 0.2s,
    border-color 0.2s,
    color 0.2s,
    transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  i {
    font-size: 16px;
  }
}

.qs_btn--light {
  background: #fff;
  border: 1px solid #fff;
  color: #111;

  &:hover {
    background: var(--primary);
    border-color: var(--primary);
    color: #fff;
  }
}

.qs_btn--outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.72);
  color: #fff;

  &:hover {
    background: #fff;
    border-color: #fff;
    color: #111;
  }
}

.qs_btn--primary {
  background: var(--primary);
  border: 1px solid var(--primary);
  color: #fff;

  &:hover {
    background: #111;
    border-color: #111;
  }
}

.qs_btn--dark-outline {
  background: transparent;
  border: 1px solid #cfd3dc;
  color: #17213a;

  &:hover {
    background: #17213a;
    border-color: #17213a;
    color: #fff;
  }
}

.qs_intro {
  padding: 76px 0 68px;
}

.qs_intro_grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.15fr);
  gap: 4rem;
  align-items: start;
  margin-bottom: 56px;
}

.qs_intro_heading h2,
.qs_story_content h2,
.qs_section_header h2,
.qs_process_header h2,
.qs_showcase_content h2,
.qs_cta h2 {
  font-size: 34px;
  line-height: 1.2;
  font-weight: 700;
  color: #151515;
  margin: 0;
}

.qs_intro_copy {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  p {
    color: #53565f;
    font-size: 15px;
    line-height: 1.75;
    margin: 0;
  }
}

.qs_stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin: 0;
  padding: 26px 0;
  border-top: 1px solid #e6e8ee;
  border-bottom: 1px solid #e6e8ee;
}

.qs_stat {
  padding-right: 2rem;

  &:not(:first-child) {
    padding-left: 2rem;
    border-left: 1px solid #e6e8ee;
  }

  dt {
    color: var(--primary);
    font-size: 34px;
    line-height: 1;
    font-weight: 800;
    margin-bottom: 0.55rem;
  }

  dd {
    color: #53565f;
    font-size: 13px;
    line-height: 1.5;
    margin: 0;
  }
}

.qs_story {
  padding: 88px 0;
  background: #f7f7f8;
}

.qs_story_grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
  gap: 4rem;
  align-items: center;
}

.qs_story_media {
  margin: 0;
  background: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.qs_story_img {
  width: min(88%, 480px);
  height: auto;
  display: block;
  object-fit: contain;
}

.qs_story_content p {
  color: #53565f;
  font-size: 15px;
  line-height: 1.75;
  margin: 1.25rem 0 2rem;
  max-width: 640px;
}

.qs_feature_list,
.qs_values_grid,
.qs_showcase_list,
.qs_process_steps {
  list-style: none;
  margin: 0;
  padding: 0;
}

.qs_feature_list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.qs_feature_list li {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 1rem;
  align-items: start;
  padding: 1rem 0;
  border-top: 1px solid #e0e1e5;

  > i {
    width: 42px;
    height: 42px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    background: #fff;
    border: 1px solid #e2e5ec;
    font-size: 18px;
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #171717;
    margin: 0 0 0.35rem;
  }

  p {
    font-size: 13px;
    line-height: 1.6;
    color: #5d626c;
    margin: 0;
  }
}

.qs_values {
  padding: 84px 0;
  background: #fff;
}

.qs_section_header {
  max-width: 700px;
  margin-bottom: 2.25rem;
}

.qs_values_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.qs_value_item {
  border: 1px solid #e6e8ee;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 238px;
  background: #fff;
  transition:
    border-color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: rgba(7, 22, 60, 0.28);
    transform: translateY(-3px);
    box-shadow: 0 18px 42px rgba(18, 26, 43, 0.08);
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #171717;
    margin: 1.15rem 0 0.65rem;
  }

  p {
    color: #5d626c;
    font-size: 13px;
    line-height: 1.65;
    margin: 0;
  }
}

.qs_value_icon {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: #fff;
  font-size: 18px;
}

.qs_process {
  padding: 86px 0;
  background: #f7f7f8;
}

.qs_process_header {
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  gap: 4rem;
  align-items: end;
  margin-bottom: 3rem;

  .qs_section_kicker {
    grid-column: 1 / -1;
    margin-bottom: -2rem;
  }

  p {
    color: #5d626c;
    font-size: 15px;
    line-height: 1.75;
    margin: 0;
  }
}

.qs_process_steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid #dfe2e9;
}

.qs_process_steps li {
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
    font-size: 17px;
    font-weight: 700;
    color: #171717;
    margin: 0 0 0.7rem;
  }

  p {
    color: #5d626c;
    font-size: 13px;
    line-height: 1.65;
    margin: 0;
  }
}

.qs_showcase {
  padding: 82px 0;
  background: #101725;
  color: #fff;
}

.qs_showcase_grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 440px);
  gap: 4rem;
  align-items: center;
}

.qs_showcase_content h2 {
  color: #fff;
  max-width: 700px;
}

.qs_showcase_content p {
  color: rgba(255, 255, 255, 0.72);
  font-size: 15px;
  line-height: 1.75;
  margin: 1.25rem 0 0;
  max-width: 680px;
}

.qs_showcase_list {
  display: grid;
  gap: 0.8rem;
}

.qs_showcase_list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
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

.qs_cta {
  padding: 76px 0;
  background: #fff;
}

.qs_cta_inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  border-top: 1px solid #e6e8ee;
  border-bottom: 1px solid #e6e8ee;
}

.qs_cta h2 {
  max-width: 640px;
}

@media (max-width: 1024px) {
  .qs_intro_grid,
  .qs_story_grid,
  .qs_process_header,
  .qs_showcase_grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .qs_intro_copy {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .qs_values_grid,
  .qs_process_steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .qs_process_header .qs_section_kicker {
    grid-column: auto;
    margin-bottom: 0;
  }

  .qs_process_steps li:nth-child(2) {
    border-right: 0;
  }

  .qs_cta_inner {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .qs_container {
    padding: 0 1rem;
  }

  .qs_hero,
  .qs_hero_overlay {
    min-height: 620px;
  }

  .qs_hero_overlay {
    align-items: flex-end;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.18) 0%,
      rgba(0, 0, 0, 0.78) 100%
    );
  }

  .qs_hero_content {
    padding-top: 4rem;
    padding-bottom: 3rem;
  }

  .qs_hero h1 {
    font-size: 32px;
  }

  .qs_intro_heading h2,
  .qs_story_content h2,
  .qs_section_header h2,
  .qs_process_header h2,
  .qs_showcase_content h2,
  .qs_cta h2 {
    font-size: 26px;
  }

  .qs_intro,
  .qs_story,
  .qs_values,
  .qs_process,
  .qs_showcase,
  .qs_cta {
    padding: 56px 0;
  }

  .qs_stats {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .qs_stat {
    padding: 0 0 1.25rem;
    border-bottom: 1px solid #e6e8ee;

    &:not(:first-child) {
      padding-left: 0;
      border-left: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }

  .qs_story_media {
    min-height: 340px;
  }

  .qs_values_grid,
  .qs_process_steps {
    grid-template-columns: 1fr;
  }

  .qs_process_steps li,
  .qs_process_steps li:nth-child(2) {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid #dfe2e9;
    padding: 1.5rem 0;
  }

  .qs_process_steps li:last-child {
    border-bottom: 0;
  }

  .qs_hero_actions,
  .qs_cta_actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .qs_btn {
    width: 100%;
  }
}

@media (max-width: 420px) {
  .qs_hero,
  .qs_hero_overlay {
    min-height: 560px;
  }

  .qs_hero h1 {
    font-size: 27px;
  }

  .qs_hero p,
  .qs_intro_copy p,
  .qs_story_content p,
  .qs_process_header p,
  .qs_showcase_content p {
    font-size: 14px;
  }
}
</style>
