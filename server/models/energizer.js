const { Model, raw } = require('objection');

class Energizer extends Model {
  static get tableName() {
    return 'energizers';
  }


  static async create(enz) {
    console.log("IN MODEL : creating "+JSON.stringify(enz,null,4))
    const {
      ethnicity=null, 
      gender=null, 
      occupation=null, 
      education=null, 
      birthday=null,
      solicitor=null,
      notes=null
    } = enz


    return Energizer.query().insert({
      first_name: enz.firstName || null,
      middle_name: enz.middleName || null,
      last_name: enz.lastName || null,
      wiki_page: enz.wikiPage || null,
      born_state: enz.bornState || null,
      born_town: enz.bornTown || null,
      home_state: enz.homeState || null,
      home_town: enz.homeTown || null,
      current_town: enz.currentTown || null,
      current_state: enz.currentState || null,
      plays_with: enz.playsWith || null,
      rep_1: enz.agencyRep || null,
      ethnicity,
      gender,
      occupation,
      education,
      solicitor,
      birthday,
      notes,
      home_zipcode: parseInt(enz.homeZipcode) || null,
      high_school: enz.highSchool || null,
      imdb_link: enz.imdbLink || null,
      social_1: enz.social1 || null,
      social_2: enz.social2 || null,
      social_3: enz.social3 || null,
      stat_1: enz.stat1 || null,
      stat_2: enz.stat2 || null
    }).returning('*');
  }


  static async update(updatedEnz) {
    console.log("IN MODEL : UPDATING "+JSON.stringify(updatedEnz,null,4))
    const {
      id,
      bio=null,
      ethnicity=null, 
      gender=null, 
      occupation=null, 
      education=null, 
      birthday=null,
      solicitor=null,
      notes=null  
    } = updatedEnz


    return Energizer.query().findById(id).patch({
      first_name:updatedEnz.firstName || null,
      middle_name: updatedEnz.middleName || null,
      last_name: updatedEnz.lastName || null,
      wiki_page: updatedEnz.wikiPage || null,
      home_state: updatedEnz.homeState || null,
      home_town: updatedEnz.homeTown || null,
      born_state: updatedEnz.bornState || null,
      born_town: updatedEnz.bornTown || null,
      current_town: updatedEnz.currentTown || null,
      current_state: updatedEnz.currentState || null,
      early_life: updatedEnz.earlyLife || null,
      plays_with: updatedEnz.playsWith || null,
      rep_1: updatedEnz.agencyRep || null,
      ethnicity,
      gender,
      occupation,
      education,
      solicitor,
      birthday,
      notes, 
      home_zipcode: parseInt(updatedEnz.homeZipcode) || null,
      high_school: updatedEnz.highSchool || null,
      imdb_link: updatedEnz.imdbLink || null,
      social_1: updatedEnz.social1 || null,
      social_2: updatedEnz.social2 || null,
      social_3: updatedEnz.social3 || null,
      stat_1: updatedEnz.stat1 || null,
      stat_2: updatedEnz.stat2 || null

    }).returning('*');
  }


    static async all() {
      return Energizer.query();
    }

    static async getById(id) {
      return Energizer.query().findById(id);
    }
  }

  module.exports = Energizer;






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



