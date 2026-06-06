<template>
  <div class="editor_texto">
    <div class="editor-controls">
      <button class="btn_editor" @click="toggleBold">
        <i class="bi bi-type-bold"></i>
      </button>
      <button class="btn_editor" @click="toggleItalic">
        <i class="bi bi-type-italic"></i>
      </button>
      <button class="btn_editor" @click="toggleUnderline">
        <i class="bi bi-type-underline"></i>
      </button>
      <button class="btn_editor" @click="setParagraph">
        <i class="bi bi-paragraph"></i>
      </button>
      <button class="btn_editor" @click="toggleBulletList">
        <i class="bi bi-list-ul"></i>
      </button>
      <button class="btn_editor" @click="toggleOrderedList">
        <i class="bi bi-list-ol"></i>
      </button>
      <select class="btn_editor" @change="toggleHeading($event.target.value)">
        <option value="">Título</option>
        <option value="1">Título 1</option>
        <option value="2">Título 2</option>
        <option value="3">Título 3</option>
      </select>
      <select class="btn_editor" @change="changeAlignment($event.target.value)">
        <option value="left">Alinhar à Esquerda</option>
        <option value="center">Centralizar</option>
        <option value="right">Alinhar à Direita</option>
      </select>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      editor: null,
    };
  },

  methods: {
    toggleBold() {
      this.editor.chain().focus().toggleBold().run();
    },
    toggleItalic() {
      this.editor.chain().focus().toggleItalic().run();
    },
    toggleUnderline() {
      this.editor.chain().focus().toggleUnderline().run();
    },
    toggleBulletList() {
      this.editor.chain().focus().toggleBulletList().run();
    },
    toggleOrderedList() {
      this.editor.chain().focus().toggleOrderedList().run();
    },
    changeAlignment(value) {
      this.editor.chain().focus().setTextAlign(value).run();
    },
    toggleHeading(level) {
      if (!level) return;
      this.editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(level) })
        .run();
    },
    setParagraph() {
      this.editor.chain().focus().setParagraph().run();
    },
  },

  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value;

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Bold,
        Italic,
        Underline,
        BulletList,
        OrderedList,
        TextAlign,
        Heading.configure({
          levels: [1, 2, 3],
        }),
        Paragraph,
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor.getHTML());
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
.editor-controls {
  margin-bottom: 10px;
}

.btn_editor {
  background: none;
  border: #dddddd solid 1px;
  padding: 6px;
  margin-right: 5px;
  border-radius: 5px;
  color: #394d6f;
  font-weight: bold;
}

.btn_editor :hover {
  cursor: pointer;
}

.editor_texto {
  border-radius: 0.375rem;
  border: solid 1px #000;
  padding: 10px;
  min-height: 200px;
  max-height: auto;
  overflow-y: auto;
}
</style>

