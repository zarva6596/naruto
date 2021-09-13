<template>
  <div class="mt-4">
    <section>
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold">
          {{ topic.taggings_count }} articles on <i>#{{ topic.name }}</i>
        </h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          <ArticleCard
            v-for="article in articles"
            :key="article.title"
            :article="article"
            :autors="autors"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import kebabCase from 'lodash/kebabCase'

export default {
  async asyncData({ app, params }) {
    // Find tag based on the slug
    const { data: tagsData } = await app.$storyapi.get('cdn/tags/')
    const topic = tagsData.tags.find((t) => kebabCase(t.name) === params.slug)

    const { data: articlesData } = await app.$storyapi.get('cdn/stories', {
      starts_with: 'articles/',
      resolve_relations: 'author',
      with_tag: topic.name,
    })

    const articles = articlesData.stories.map((story) => {
      story.content.date = new Date(story.content.date)
      return story
    })

    const autors = articlesData.rels

    return { topic, articles, autors }
  },

  head() {
    return {
      title: `${this.topic.name} - NarutoDose`,
    }
  },
}
</script>