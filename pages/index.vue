<template>
  <div class="mt-4">
    <section>
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold">Articles</h1>
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
export default {
  async asyncData({ app }) {
    const res = await app.$storyapi.get('cdn/stories', {
      starts_with: 'articles/',
      resolve_relations: 'author',
    })

    // console.log(res.data)
 
    const articles = res.data.stories.map((story) => {
      story.content.date = new Date(story.content.date)
      return story
    });

    const autors = res.data.rels    
 
    return { articles, autors }
  },
}
</script>