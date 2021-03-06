const {
  delArticleById,
  updateArticleById,
  addCommentByArticleId,
  selectCommentsByArticleId,
  selectArticles,
  insertArticle,
} = require('../models/articles.models');

exports.deleteArticleById = (req, res, next) => {
  const {
    params: { article_id },
  } = req;
  delArticleById(article_id)
    .then((deletedRows) => {
      if (deletedRows !== 0) {
        res.sendStatus(204);
      } else {
        return Promise.reject({ status: 404, msg: 'Article does not exist' });
      }
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const {
    params: { article_id },
    body,
  } = req;
  updateArticleById(article_id, body)
    .then((updatedArticle) => {
      res.send({ updatedArticle });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const {
    params: { article_id },
    query: { sort_by, order, author, topic, p, limit },
  } = req;
  selectArticles(article_id, sort_by, order, author, topic, p, limit)
    .then(({ articles, total_count }) => {
      if (Array.isArray(articles)) res.send({ articles, total_count });
      else res.send({ article: articles, total_count });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  const { body } = req;
  insertArticle(body)
    .then((postedArticle) => {
      res.status(201).send({ postedArticle });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const {
    params: { article_id },
    body,
  } = req;
  addCommentByArticleId(article_id, body)
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const {
    params: { article_id },
    query: { sort_by, order, p, limit },
  } = req;
  selectCommentsByArticleId(article_id, sort_by, order, p, limit)
    .then((comments) => {
      res.send({ comments });
    })
    .catch(next);
};
