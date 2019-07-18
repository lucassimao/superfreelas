const FreelaDao= require('../dao/freela.dao');

class FreelaService{

    listAll(){
        return FreelaDao.find().exec();
    }

}

module.exports = FreelaService;