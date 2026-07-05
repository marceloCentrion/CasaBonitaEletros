<template>
  <main>
    <section class="page_hero" aria-labelledby="hero_heading">
      <div class="page_hero__overlay">
        <div class="page_hero__content">
          <span class="page_hero__tag">LOGÍSTICA E ENVIO</span>
          <h1 id="hero_heading">Prazos de Entrega</h1>
          <p>
            Entregamos com agilidade e segurança para todo o Brasil. Veja os
            prazos estimados, formas de envio e como acompanhar o seu pedido.
          </p>
        </div>
      </div>
    </section>

    <nav class="breadcrumb" aria-label="Você está em">
      <div class="breadcrumb__container">
        <NuxtLink to="/" class="breadcrumb__link">Início</NuxtLink>
        <i class="bi bi-chevron-right breadcrumb__sep" aria-hidden="true"></i>
        <span class="breadcrumb__current">Prazos de Entrega</span>
      </div>
    </nav>

    <section class="highlights" aria-label="Destaques da entrega">
      <div class="highlights__container">
        <div class="highlight_card">
          <div class="highlight_card__icon">
            <i class="bi bi-box-seam" aria-hidden="true"></i>
          </div>
          <h3>Despacho em 48h</h3>
          <p>
            Seu pedido é separado e despachado em até 48 horas úteis após a
            confirmação do pagamento.
          </p>
        </div>
        <div class="highlight_card">
          <div class="highlight_card__icon">
            <i class="bi bi-truck" aria-hidden="true"></i>
          </div>
          <h3>Frete Grátis</h3>
          <p>
            Frete grátis para pedidos acima do valor mínimo e em produtos
            selecionados.
          </p>
        </div>
        <div class="highlight_card">
          <div class="highlight_card__icon">
            <i class="bi bi-cursor-fill" aria-hidden="true"></i>
          </div>
          <h3>Rastreamento</h3>
          <p>
            Acompanhe cada etapa da entrega em tempo real pelo código enviado
            por e-mail e WhatsApp.
          </p>
        </div>
        <div class="highlight_card">
          <div class="highlight_card__icon">
            <i class="bi bi-geo-alt" aria-hidden="true"></i>
          </div>
          <h3>Todo o Brasil</h3>
          <p>
            Entregamos para todos os estados do país com transportadoras
            parceiras confiáveis.
          </p>
        </div>
      </div>
    </section>

    <section class="policy" aria-labelledby="policy_heading">
      <div class="policy__container">
        <aside class="policy__sidebar" aria-label="Índice">
          <div class="sidebar_index">
            <span class="sidebar_index__title">Nesta página</span>
            <ul class="sidebar_index__list">
              <li>
                <a href="#como-funciona" class="sidebar_index__link"
                  >Como Funciona</a
                >
              </li>
              <li>
                <a href="#prazos-regiao" class="sidebar_index__link"
                  >Prazos por Região</a
                >
              </li>
              <li>
                <a href="#frete-gratis" class="sidebar_index__link"
                  >Frete Grátis</a
                >
              </li>
              <li>
                <a href="#rastreamento" class="sidebar_index__link"
                  >Rastreamento</a
                >
              </li>
              <li>
                <a href="#entrega-agendada" class="sidebar_index__link"
                  >Entrega Agendada</a
                >
              </li>
              <li>
                <a href="#avarias" class="sidebar_index__link"
                  >Produto Avariado</a
                >
              </li>
              <li>
                <a href="#contato" class="sidebar_index__link">Fale Conosco</a>
              </li>
            </ul>
          </div>
        </aside>

        <div class="policy__content">
          <article class="policy_block" id="como-funciona">
            <div class="policy_block__header">
              <div class="policy_block__icon-wrap">
                <i class="bi bi-box-seam" aria-hidden="true"></i>
              </div>
              <h2>Como Funciona o Processo de Entrega</h2>
            </div>
            <div class="policy_block__body">
              <p>
                Após a confirmação do pagamento, seu pedido entra na fila de
                separação e embalagem. O prazo de entrega começa a contar a
                partir do <strong>despacho do produto</strong>, não da data do
                pedido.
              </p>
              <ol class="policy_steps">
                <li class="policy_step">
                  <span class="policy_step__number">01</span>
                  <div class="policy_step__info">
                    <strong>Pagamento confirmado</strong>
                    <p>
                      Recebemos a confirmação e iniciamos a separação do pedido
                      imediatamente.
                    </p>
                  </div>
                </li>
                <li class="policy_step">
                  <span class="policy_step__number">02</span>
                  <div class="policy_step__info">
                    <strong>Separação e embalagem</strong>
                    <p>
                      Seu produto é embalado com cuidado em até 48 horas úteis
                      após a confirmação.
                    </p>
                  </div>
                </li>
                <li class="policy_step">
                  <span class="policy_step__number">03</span>
                  <div class="policy_step__info">
                    <strong>Despacho para transportadora</strong>
                    <p>
                      O pedido é coletado e o código de rastreamento é enviado
                      por e-mail e/ou WhatsApp.
                    </p>
                  </div>
                </li>
                <li class="policy_step">
                  <span class="policy_step__number">04</span>
                  <div class="policy_step__info">
                    <strong>Transporte e entrega</strong>
                    <p>
                      A transportadora realiza a entrega no endereço informado
                      no prazo estimado para a sua região.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </article>

          <article class="policy_block" id="prazos-regiao">
            <div class="policy_block__header">
              <div class="policy_block__icon-wrap">
                <i class="bi bi-geo-alt" aria-hidden="true"></i>
              </div>
              <h2>Prazos Estimados por Região</h2>
            </div>
            <div class="policy_block__body">
              <p>
                Os prazos abaixo são estimativas a partir da data de despacho e
                podem variar conforme o CEP exato e a transportadora responsável
                pela rota.
              </p>
              <div class="policy_table_wrap">
                <table
                  class="policy_table"
                  aria-label="Prazos de entrega por região"
                >
                  <thead>
                    <tr>
                      <th>Região</th>
                      <th>Estados</th>
                      <th>Prazo estimado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <i class="bi bi-building" aria-hidden="true"></i>
                        Sul &amp; Sudeste
                      </td>
                      <td>PR · SC · RS · SP · RJ · MG · ES</td>
                      <td><strong>2 a 5 dias úteis</strong></td>
                    </tr>
                    <tr>
                      <td>
                        <i class="bi bi-map" aria-hidden="true"></i>
                        Centro-Oeste
                      </td>
                      <td>GO · MT · MS · DF</td>
                      <td><strong>4 a 8 dias úteis</strong></td>
                    </tr>
                    <tr>
                      <td>
                        <i class="bi bi-sun" aria-hidden="true"></i>
                        Nordeste
                      </td>
                      <td>BA · PE · CE · MA · PI · RN · PB · SE · AL</td>
                      <td><strong>6 a 12 dias úteis</strong></td>
                    </tr>
                    <tr>
                      <td>
                        <i class="bi bi-tree" aria-hidden="true"></i>
                        Norte
                      </td>
                      <td>AM · PA · RO · AC · RR · AP · TO</td>
                      <td><strong>8 a 15 dias úteis</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="policy_alert policy_alert--info">
                <i class="bi bi-info-circle-fill" aria-hidden="true"></i>
                <span>
                  Os prazos são estimativas e podem sofrer variações em períodos
                  de alta demanda como datas comemorativas, greves ou condições
                  climáticas adversas.
                </span>
              </div>
            </div>
          </article>

          <article class="policy_block" id="frete-gratis">
            <div class="policy_block__header">
              <div class="policy_block__icon-wrap">
                <i class="bi bi-truck" aria-hidden="true"></i>
              </div>
              <h2>Frete Grátis</h2>
            </div>
            <div class="policy_block__body">
              <p>
                Oferecemos <strong>frete grátis</strong> para pedidos que
                atendam às condições abaixo. O benefício é aplicado
                automaticamente no carrinho.
              </p>
              <ul class="policy_checklist">
                <li class="policy_checklist__item policy_checklist__item--ok">
                  <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                  Pedidos acima do valor mínimo definido para cada região
                </li>
                <li class="policy_checklist__item policy_checklist__item--ok">
                  <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                  Produtos com a tag "Frete Grátis" na página do produto
                </li>
                <li class="policy_checklist__item policy_checklist__item--ok">
                  <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                  Combos especiais — o frete grátis já está incluso no valor
                  apresentado
                </li>
              </ul>
              <div class="policy_alert policy_alert--warning">
                <i
                  class="bi bi-exclamation-triangle-fill"
                  aria-hidden="true"
                ></i>
                <span>
                  Para regiões remotas (interiores de AM, PA, AC e outras
                  localidades de difícil acesso), pode haver cobrança de frete
                  adicional, informada no checkout antes da finalização.
                </span>
              </div>
            </div>
          </article>

          <article class="policy_block" id="rastreamento">
            <div class="policy_block__header">
              <div class="policy_block__icon-wrap">
                <i class="bi bi-cursor-fill" aria-hidden="true"></i>
              </div>
              <h2>Rastreamento do Pedido</h2>
            </div>
            <div class="policy_block__body">
              <p>
                Após o despacho, você receberá o
                <strong>código de rastreamento</strong> por e-mail e/ou
                WhatsApp. Com ele, é possível acompanhar cada etapa da entrega
                diretamente no site da transportadora.
              </p>
              <p>
                Se o código não atualizar em até
                <strong>3 dias úteis</strong> após o despacho, entre em contato
                com nossa equipe.
              </p>
              <div class="policy_alert policy_alert--info">
                <i class="bi bi-info-circle-fill" aria-hidden="true"></i>
                <span>
                  Após o despacho, o rastreamento pode levar até
                  <strong>24 horas</strong> para ser ativado no sistema da
                  transportadora. Isso é normal e não significa atraso.
                </span>
              </div>
            </div>
          </article>

          <article class="policy_block" id="entrega-agendada">
            <div class="policy_block__header">
              <div class="policy_block__icon-wrap">
                <i class="bi bi-calendar3" aria-hidden="true"></i>
              </div>
              <h2>Entrega Agendada</h2>
            </div>
            <div class="policy_block__body">
              <p>
                Dependendo da transportadora e da sua localidade, pode ser
                oferecida a opção de <strong>agendamento de entrega</strong>.
                Nesse caso, você receberá um contato para escolher o melhor
                horário.
              </p>
              <p>
                Para eletrodomésticos de maior porte, recomendamos garantir que
                haja alguém no endereço para receber o produto, pois a
                transportadora pode não tentar uma segunda entrega sem
                agendamento.
              </p>
              <div class="policy_alert policy_alert--warning">
                <i
                  class="bi bi-exclamation-triangle-fill"
                  aria-hidden="true"
                ></i>
                <span>
                  Em caso de ausência no endereço, o produto retorna ao centro
                  de distribuição. Uma nova tentativa de entrega será agendada,
                  podendo gerar prazo adicional.
                </span>
              </div>
            </div>
          </article>

          <article class="policy_block" id="avarias">
            <div class="policy_block__header">
              <div
                class="policy_block__icon-wrap policy_block__icon-wrap--danger"
              >
                <i class="bi bi-exclamation-diamond" aria-hidden="true"></i>
              </div>
              <h2>Produto Avariado ou Extraviado</h2>
            </div>
            <div class="policy_block__body">
              <p>
                Caso receba um produto com
                <strong>embalagem danificada ou avariado</strong>, siga os
                passos abaixo para garantir seus direitos:
              </p>
              <ul class="policy_checklist">
                <li class="policy_checklist__item policy_checklist__item--ok">
                  <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                  Recuse o recebimento e anote a recusa no comprovante do
                  entregador
                </li>
                <li class="policy_checklist__item policy_checklist__item--ok">
                  <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                  Fotografe a embalagem antes de abrir, caso já tenha recebido
                </li>
                <li class="policy_checklist__item policy_checklist__item--ok">
                  <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                  Entre em contato conosco em até 48 horas com fotos do produto
                  e da embalagem
                </li>
                <li class="policy_checklist__item policy_checklist__item--ok">
                  <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                  Nossa equipe abrirá uma ocorrência com a transportadora e
                  providenciará o reenvio
                </li>
              </ul>
              <div class="policy_alert policy_alert--warning">
                <i
                  class="bi bi-exclamation-triangle-fill"
                  aria-hidden="true"
                ></i>
                <span>
                  Reclamações de avaria devem ser feitas em até
                  <strong>48 horas</strong> após o recebimento. Após esse prazo,
                  pode não ser possível abrir ocorrência na transportadora.
                </span>
              </div>
            </div>
          </article>

          <div class="policy_cta" id="contato" aria-label="Fale conosco">
            <div class="policy_cta__content">
              <i
                class="bi bi-chat-dots policy_cta__icon"
                aria-hidden="true"
              ></i>
              <div>
                <h3>Precisa de ajuda com seu pedido?</h3>
                <p>
                  Nossa equipe está disponível para acompanhar sua entrega e
                  resolver qualquer situação.
                </p>
              </div>
            </div>
            <div class="policy_cta__actions">
              <a href="#whatsapp" class="btn btn--primary">
                <i class="bi bi-whatsapp" aria-hidden="true"></i> WhatsApp
              </a>
              <a
                href="mailto:contato@cozinharte.com.br"
                class="btn btn--outline"
              >
                <i class="bi bi-envelope" aria-hidden="true"></i> E-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
useHead({ title: "Prazos de Entrega | Casa Bonita Eletros" });
definePageMeta({ layout: "site" });
</script>

<style scoped lang="scss">
@use "sass:color";
@use "@/assets/scss/variables" as *;

.page_hero {
  width: 100%;
  height: 340px;
  background: url("/images/hero1.jpg") center / cover no-repeat;
  position: relative;
}

.page_hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
}

.page_hero__content {
  text-align: center;
  color: #fff;
  padding: 0 2rem;
  max-width: 680px;

  h1 {
    font-size: 2.6rem;
    font-weight: 700;
    margin: 0.75rem 0 1rem;
  }

  p {
    font-size: 14px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
  }
}

.page_hero__tag {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  padding: 5px 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.breadcrumb {
  background: #f9f9f9;
  border-bottom: 1px solid #ebebeb;
}

.breadcrumb__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 12px 2rem;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.breadcrumb__link {
  color: #555;
  text-decoration: none;

  &:hover {
    color: var(--primary);
  }
}

.breadcrumb__sep {
  font-size: 10px;
  color: #aaa;
}

.breadcrumb__current {
  color: #1a1a1a;
  font-weight: 500;
}

.highlights {
  background: #fff;
  padding: 60px 0;
  border-bottom: 1px solid #ebebeb;
}

.highlights__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.highlight_card {
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
  }

  p {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
    margin: 0;
  }
}

.highlight_card__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary) 90%, white);
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.policy {
  background: #fff;
  padding: 60px 0 100px;
}

.policy__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 3rem;
  align-items: start;
}

.sidebar_index {
  position: sticky;
  top: 100px;
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  padding: 1.25rem;
}

.sidebar_index__title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #999;
  text-transform: uppercase;
  display: block;
  margin-bottom: 1rem;
}

.sidebar_index__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar_index__link {
  display: block;
  font-size: 13px;
  color: #444;
  text-decoration: none;
  padding: 7px 10px;
  border-radius: 8px;
  transition:
    background 0.15s,
    color 0.15s;

  &:hover {
    background: var(--primary);
    color: $white;
  }
}

.policy__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.policy_block {
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  overflow: hidden;
}

.policy_block__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.75rem;
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;

  h2 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
  }
}

.policy_block__icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary) 50%, white);
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-size: 1.1rem;
  flex-shrink: 0;

  &--danger {
    background: #fdecea;
    color: #c62828;
  }
}

.policy_block__body {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: 14px;
    line-height: 1.75;
    color: #444;
    margin: 0;
  }

  strong {
    color: #1a1a1a;
  }
}

.policy_steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.policy_step {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  p {
    margin: 0.25rem 0 0;
    font-size: 13px;
    color: #666;
  }

  strong {
    font-size: 14px;
    color: #1a1a1a;
  }
}

.policy_step__number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.policy_step__info {
  display: flex;
  flex-direction: column;
}

.policy_checklist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.policy_checklist__item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 14px;
  line-height: 1.5;

  i {
    font-size: 1rem;
    margin-top: 2px;
    flex-shrink: 0;
  }

  &--ok {
    color: #333;

    i {
      color: #2e7d32;
    }
  }

  &--no {
    color: #555;

    i {
      color: #c62828;
    }
  }
}

.policy_alert {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.6;

  i {
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 1px;
  }

  &--info {
    background: #e3f2fd;
    color: #1565c0;

    i {
      color: #1565c0;
    }
  }

  &--warning {
    background: #fff8e1;
    color: #7b5800;

    i {
      color: #f9a825;
    }
  }

  &--success {
    background: #e8f5e9;
    color: #2e7d32;

    i {
      color: #2e7d32;
    }
  }
}

.policy_table_wrap {
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid #e8e8e8;
}

.policy_table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;

  thead tr {
    background: #f5f5f5;
  }

  th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: #333;
    white-space: nowrap;
  }

  td {
    padding: 13px 16px;
    color: #555;
    border-top: 1px solid #f0f0f0;

    i {
      margin-right: 6px;
      color: var(--primary);
    }
  }

  tbody tr:hover {
    background: #fafafa;
  }
}

.policy_cta {
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  background: #fafafa;
}

.policy_cta__content {
  display: flex;
  align-items: center;
  gap: 1.25rem;

  h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 4px;
  }

  p {
    font-size: 13px;
    color: #666;
    margin: 0;
  }
}

.policy_cta__icon {
  font-size: 2rem;
  color: var(--primary);
  flex-shrink: 0;
}

.policy_cta__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 11px 22px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;

  &--primary {
    background: var(--primary);
    color: #fff;

    &:hover {
      opacity: 0.88;
    }
  }

  &--outline {
    border: 1.5px solid #d0d0d0;
    color: #333;
    background: #fff;

    &:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
  }
}

@media (max-width: 1024px) {
  .highlights__container {
    grid-template-columns: repeat(2, 1fr);
  }

  .policy__container {
    grid-template-columns: 1fr;
  }

  .sidebar_index {
    position: static;
    display: none;
  }
}

@media (max-width: 768px) {
  .page_hero {
    height: 260px;
  }

  .page_hero__content h1 {
    font-size: 1.9rem;
  }

  .highlights__container {
    grid-template-columns: repeat(2, 1fr);
  }

  .policy_cta {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 540px) {
  .highlights__container {
    grid-template-columns: 1fr;
  }

  .page_hero__content h1 {
    font-size: 1.5rem;
  }

  .policy_block__header {
    padding: 1.25rem;
  }

  .policy_block__body {
    padding: 1.25rem;
  }
}
</style>
