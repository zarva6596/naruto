<template>
  <nuxt-link
    class="block text-gray-800 rounded-lg shadow-lg p-6"
    :to="`/${article.slug}`"
  >
    <header class="text-2xl font-bold">{{ article.content.title }}</header>
    <p class="mt-4">{{ article.content.description }}</p>
    <footer class="flex items-center mt-6">
      <img
        class="w-20 rounded-full border-4 border-main"
        :src="autors.find(autor => autor.uuid === article.content.author).content.Avatar.filename"
        :alt="autors.find(autor => autor.uuid === article.content.author).content.Avatar.alt"
      />
      <div class="ml-6">
        <p class="text-xl font-bold">{{ autors.find(autor => autor.uuid === article.content.author).name }}</p>
        <p class="text-sm mt-1">{{ article.content.date.toLocaleDateString() }}</p>
      </div>
    </footer>
  </nuxt-link>
</template>

<script>
import kebabCase from 'lodash/kebabCase'

export default {
  props: {
    article: {
      type: Object,
      requared: () => {}
    },

    autors: {
      type: Object,
      requared: () => {}
    }
  },

   methods: {
    tagSlug(tag) {
      return kebabCase(tag)
    },
  }
}
</script>
