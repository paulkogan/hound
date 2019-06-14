const { Model, raw } = require('objection');

class Energizer extends Model {
  static get tableName() {
    return 'energizers';
  }

  static async create({firstName,lastName, occupation, wikiPage }) {
    return Energizer.query().insert({
      first_name:firstName,
      last_name: lastName,
      occupation,
      wiki_page: wikiPage
    }).returning('*');
  }

  static async update({id, firstName,lastName, occupation, wikiPage,
    homeState, homeTown,   bornState, bornTown, education,bio }) {
    return Energizer.query().findById(id).patch({
      first_name:firstName,
      last_name: lastName,
      occupation,
      wiki_page: wikiPage,
      home_state: homeState,
      home_town: homeTown,
      born_state: bornState,
      born_town: bornTown,
      education,
      bio
    }).returning('*');
  }


    static async all() {
      return Energizer.query();
    }

    static async getById(id) {
      return Energizer.query().findById(id);
    }


  // static get relationMappings() {
  //   return {
  //     user: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: User,
  //       join: {
  //         from: 'providers.user_id',
  //         to: 'users.id',
  //       },
  //     },
  //     practice: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: Practice,
  //       join: {
  //         from: 'providers.practice_id', to: 'practices.id',
  //       },
  //     },
  //     locations: {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: Location,
  //       join: {
  //         from: 'providers.id',
  //         through: {
  //           from: 'providers_locations.provider_id',
  //           to: 'providers_locations.location_id',
  //         },
  //         to: 'locations.id',
  //       },
  //     },
  //     timekitTranslations: {
  //       relation: Model.HasManyRelation,
  //       modelClass: TimekitTranslation,
  //       join: {
  //         from: 'providers.id',
  //         to: 'timekit_translations.provider_id',
  //       },
  //     },
  //   };
  // }


  //
  // static async getByUserId(userId) {
  //   return Provider.query().eager('[locations, user, practice]').findOne({ user_id: userId });
  // }

  //
  // static async providersInPractice(providerId) {
  //   const provider = await Provider.getById(providerId);
  //   return Provider
  //     .query()
  //     .eager('[locations, user, practice]')
  //     .where(raw('practice_id = ? AND id != ?', provider.practice_id, provider.id));
  // }
  //
  // static async getTimekitProjectIds(id) {
  //   const provider = await Provider.query().eager('timekitTranslations').findById(id);
  //   return provider.timekitTranslations.map(translation => translation.timekit_project_id);
  // }

//   get firstName() {
//     if (!this.user || !this.user.first_name) { return ''; }
//     return this.user.first_name;
//   }
//
//   get lastName() {
//     if (!this.user || !this.user.last_name) { return ''; }
//     return this.user.last_name;
//   }
//
//   get name() {
//     if (!this.firstName || !this.lastName) { return ''; }
//     return `${this.firstName} ${this.lastName}`;
//   }
//
//   get imageUrl() {
//     return this.image_url;
//   }
//
//   get phone() {
//     if (!this.user || !this.user.phone) { return ''; }
//     return this.user.phone;
//   }
//
//   get practiceName() {
//     if (!this.practice || !this.practice.name) { return ''; }
//     return this.practice.name;
//   }


}

module.exports = Energizer;
