<template>
  <footer id="app_footer" aria-label="Rodapé do site">
    <div class="footer_main">
      <div class="footer_container">
        <div class="footer_brand">
          <NuxtLink
            to="/"
            class="footer_logo"
            aria-label="Casa Bonita Eletros - ir para home"
          >
            <NuxtImg src="/logo/logo.svg" style="max-width: 140px" />
          </NuxtLink>
          <p class="footer_slogan">
            Tecnologia, design e sofisticação para transformar sua cozinha.
          </p>
          <address class="footer_contact">
            <a
              v-if="state.empresa.telefone"
              :href="phoneHref"
              class="footer_contact_item"
              aria-label="Telefone"
            >
              <i class="bi bi-telephone" aria-hidden="true"></i>
              <span>{{ state.empresa.telefone }}</span>
            </a>
            <a
              v-if="mostrarWhatsappRodape"
              :href="whatsappHref"
              target="_blank"
              rel="noopener noreferrer"
              class="footer_contact_item"
              aria-label="WhatsApp"
            >
              <i class="bi bi-whatsapp" aria-hidden="true"></i>
              <span>{{ state.empresa.whatsapp }}</span>
            </a>
            <a
              v-if="state.empresa.email"
              :href="`mailto:${state.empresa.email}`"
              class="footer_contact_item"
              aria-label="E-mail"
            >
              <i class="bi bi-envelope" aria-hidden="true"></i>
              <span>{{ state.empresa.email }}</span>
            </a>
            <a
              v-if="state.empresa.endereco"
              :href="googleMapsHref"
              target="_blank"
              rel="noopener noreferrer"
              class="footer_contact_item footer_address"
              aria-label="Abrir endereco no Google Maps"
            >
              <i class="bi bi-geo-alt" aria-hidden="true"></i>
              <div class="footer_address_text">
                <span
                  >{{ state.empresa.endereco }}<template v-if="state.empresa.numero"
                    >, {{ state.empresa.numero }}</template
                  ></span
                >
                <span v-if="state.empresa.cep">CEP: {{ state.empresa.cep }}</span>
                <span v-if="state.empresa.cidade_uf">{{ state.empresa.cidade_uf }}</span>
              </div>
            </a>
          </address>
        </div>

        <nav class="footer_nav footer_nav--grupos" aria-labelledby="footer_cat_heading">
          <h3 class="footer_nav_title" id="footer_cat_heading">Categorias</h3>
          <ul class="footer_nav_list">
            <li v-for="grupo in state.grupos" :key="grupo.urn">
              <NuxtLink
                :to="{ path: '/produtos', query: { grupo: grupo.urn } }"
              >
                {{ grupo.nome }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav class="footer_nav" aria-labelledby="footer_atend_heading">
          <h3 class="footer_nav_title" id="footer_atend_heading">
            Atendimento
          </h3>
          <ul class="footer_nav_list">
            <li>
              <NuxtLink to="/atendimento">Central de Atendimento</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/trocas-devolucoes">Trocas e Devoluções</NuxtLink>
            </li>
            <li><NuxtLink to="/prazo-entrega">Prazo de Entrega</NuxtLink></li>
            <li><NuxtLink to="/faq">Perguntas Frequentes</NuxtLink></li>
          </ul>
        </nav>

        <div class="footer_instagram" aria-labelledby="footer_ig_heading">
          <div class="footer_ig_header">
            <h3 class="footer_nav_title" id="footer_ig_heading">
              Instagram Post
            </h3>
            <a
              href="https://instagram.com/cozinharte"
              target="_blank"
              rel="noopener noreferrer"
              class="footer_ig_btn"
              aria-label="Ver perfil no Instagram"
            >
              <i class="bi bi-instagram" aria-hidden="true"></i>
            </a>
          </div>

          <div class="footer_ig_grid" aria-label="Fotos do Instagram">
            <a
              v-for="(foto, i) in igFotos"
              :key="i"
              :href="foto.link || 'https://instagram.com/cozinharte'"
              target="_blank"
              rel="noopener noreferrer"
              class="footer_ig_item"
              :aria-label="'Ver post ' + (i + 1) + ' no Instagram'"
            >
              <NuxtImg
                :src="foto.src"
                :alt="foto.alt || 'Post do Instagram'"
                class="footer_ig_img"
                @error="onIgImgError"
              />
              <span class="footer_ig_overlay" aria-hidden="true">
                <i class="bi bi-instagram"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer_bottom" aria-label="Informações legais e pagamentos">
      <div class="footer_container footer_bottom_inner">
        <p class="footer_copy mb-0">
          © {{ anoAtual }} Casa Bonita Eletros. Todos os direitos reservados.
        </p>
        <div class="footer_payments" aria-label="Formas de pagamento aceitas">
          <img
            src="/images/pagamentos/visa.svg"
            alt="Visa"
            class="payment_icon"
          />
          <img
            src="/images/pagamentos/mastercard.svg"
            alt="Mastercard"
            class="payment_icon"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const anoAtual = new Date().getFullYear();
const { grupos, empresa, carregarGruposSite, carregarEmpresaSite } =
  useSiteData();

const igFotos = ref([]);

const state = reactive({
  grupos,
  empresa,
});

const telefoneDigits = computed(() =>
  (state.empresa.telefone || "").replace(/\D/g, ""),
);

const whatsappDigits = computed(() =>
  (state.empresa.whatsapp || "").replace(/\D/g, ""),
);

const phoneHref = computed(() => {
  if (!telefoneDigits.value) return "/contato";
  const numero = telefoneDigits.value.startsWith("55")
    ? telefoneDigits.value
    : `55${telefoneDigits.value}`;
  return `tel:+${numero}`;
});

const mostrarWhatsappRodape = computed(() =>
  Boolean(whatsappDigits.value && whatsappDigits.value !== telefoneDigits.value),
);

const whatsappHref = computed(() => {
  if (!whatsappDigits.value) return "/contato";
  const numero = whatsappDigits.value.startsWith("55")
    ? whatsappDigits.value
    : `55${whatsappDigits.value}`;
  const message = encodeURIComponent(
    "Olá! Vim através do site Casa Bonita Eletros e gostaria de atendimento pelo WhatsApp.",
  );
  return `https://wa.me/${numero}?text=${message}`;
});

const googleMapsHref = computed(() => {
  const partes = [
    state.empresa.endereco,
    state.empresa.numero,
    state.empresa.cidade_uf,
    state.empresa.cep ? `CEP ${state.empresa.cep}` : "",
  ].filter(Boolean);

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partes.join(", "))}`;
});

function onIgImgError(e) {
  if (import.meta.client && e?.target)
    e.target.src = "/placeholder-default.png";
}

onMounted(() => {
  carregarGruposSite();
  carregarEmpresaSite();
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

#app_footer {
  width: 100%;
  background: #fff;
  border-top: 1px solid #ebebeb;
}

.footer_main {
  padding: 56px 0 48px;
}

.footer_container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer_main .footer_container {
  display: grid;
  grid-template-columns: 260px 140px 200px 1fr;
  gap: 2.5rem;
  align-items: start;
}

.footer_logo {
  display: inline-block;
  text-decoration: none;
  margin-bottom: 0.85rem;
}

.footer_slogan {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 220px;
}

.footer_contact {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  font-style: normal;
}

.footer_contact_item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 13px;
  color: #444;
  text-decoration: none;
  transition: color 0.2s;

  i {
    font-size: 15px;
    color: #888;
    flex-shrink: 0;
  }

  &:hover {
    color: var(--primary);
  }
}

.footer_address {
  align-items: flex-start;
}

.footer_address_text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.footer_nav_title {
  font-size: 14px;
  font-weight: 700;
  color: #111;
  margin-bottom: 1.1rem;
  letter-spacing: 0.01em;
}

.footer_nav_list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  a {
    font-size: 13px;
    color: #555;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: var(--primary);
    }
  }
}

.footer_ig_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.9rem;
}

.footer_ig_btn {
  width: 36px;
  height: 36px;
  background: #1a2744;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.footer_ig_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.footer_ig_item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 6px;
  display: block;

  &:hover .footer_ig_overlay {
    opacity: 1;
  }
  &:hover .footer_ig_img {
    transform: scale(1.06);
  }
}

.footer_ig_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
  background: #f0f0f0;
}

.footer_ig_overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.38);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.25s ease;
  border-radius: 6px;
}

.footer_bottom {
  border-top: 1px solid #ebebeb;
  padding: 18px 0;
}

.footer_bottom_inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer_copy {
  font-size: 12.5px;
  color: #888;
}

.footer_payments {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.payment_icon {
  height: 24px;
  width: auto;
  object-fit: contain;
}

@media (max-width: 1024px) {
  .footer_main .footer_container {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer_instagram {
    grid-column: 1 / -1;
  }
  .footer_ig_grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 640px) {
  .footer_main .footer_container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    justify-items: center;
  }

  .footer_brand,
  .footer_nav,
  .footer_instagram {
    width: 100%;
  }

  .footer_logo {
    margin-left: auto;
    margin-right: auto;
  }

  .footer_slogan {
    margin-left: auto;
    margin-right: auto;
  }

  .footer_contact {
    align-items: center;
  }

  .footer_contact_item {
    justify-content: center;
    text-align: center;
  }

  .footer_nav_list {
    align-items: center;
  }

  .footer_nav--grupos .footer_nav_list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 1.5rem;
    row-gap: 0.65rem;
    justify-items: center;
    max-width: 320px;
    margin: 0 auto;
  }

  .footer_instagram {
    grid-column: auto;
  }

  .footer_ig_header {
    justify-content: center;
    gap: 0.8rem;
  }

  .footer_ig_grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 260px;
    margin: 0 auto;
  }

  .footer_bottom_inner {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
}
</style>
