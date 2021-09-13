<template>
  <div class="container mx-auto px-4 mt-4">
    <header>
      <h2 class="text-5xl">{{ article.content.title }}</h2>
      <div class="flex items-center mt-6">
        <img
          class="w-20 rounded-full border-4 border-main"
          :src="autors.find(autor => autor.uuid === article.content.author).content.Avatar.filename"
          :alt="autors.find(autor => autor.uuid === article.content.author).content.Avatar.alt"
        />
        <div class="ml-6">
          <p class="text-xl font-bold">{{ autors.find(autor => autor.uuid === article.content.author).name }}</p>
          <p class="text-sm mt-1">
            {{ article.content.date.toLocaleDateString() }}
          </p>
        </div>
      </div>
    </header>
    <div class="mt-4">
      <nuxt-link
        v-for="tag in article.tag_list"
        :key="tag"
        :to="`/topics/${tagSlug(tag)}`"
        class="rounded-full text-white bg-main uppercase text-sm mr-2 px-2 py-1"
        style="background-color: #38b2ac"
      >
        {{ tag }}
      </nuxt-link>
    </div>
    <div v-html="$md.render(article.content.content)" class="mt-8"></div> 
  </div>
</template>

<script>
import kebabCase from 'lodash/kebabCase'
import { createSEOMeta } from "../utils/seo";

export default {
  async asyncData({ app, route }) {
    const slug = route.params.slug
 
    const res = await app.$storyapi.get('cdn/stories', {
      starts_with: 'articles/',
      by_slugs: '*/' + slug,
      resolve_relations: 'author',
    });

    const autors = res.data.rels;
 
    const article = res.data.stories[0]
    article.content.date = new Date(article.content.date)
 
    return { article, autors }
  },

  methods: {
    tagSlug(tag) {
      return kebabCase(tag)
    },
  },

  head() {
    const url = this.article.slug;
    const { title, description, Asset: image } = this.article.content

    return {
      title,
      meta: createSEOMeta({ title, description, image: image.filename, url }),
    }
  },
}
</script>