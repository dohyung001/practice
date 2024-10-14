//쿼리가 작성된 파일
module.exports = {
    customerList : `select * from customers`, //customers 전체 목록을 보여줘!
    customerInsert : 'insert into customers set ?', //customers에 ?를 추가
    customerUpdate : 'update customers set ? where id = ?', //customers의 id를 ?로 업뎃
    customerDelete : 'delete from customers where id=?', //customers의 ?를 제거
}

