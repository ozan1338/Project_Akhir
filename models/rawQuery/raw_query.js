const query = {}

query.getListProduk = (nama_produk) => {
    return `select pd.nama_produk,kp.kd_produk,pd.total_produk,pd.unassigned,pd.rak,ks.kd_satuan,pd.poto_produk
    from public.produks pd
    left join public.kode_produks kp
    on pd.kd_produk = kp.id
    inner join public.kode_satuans ks
    on pd.kd_satuan = ks.id
    where nama_produk iLike '%${nama_produk}%'
    order by pd.nama_produk asc 
    `
}

query.countAllProduk = (nama_produk) => {
    return `select count(*)
    from public.produks pd
    left join public.kode_produks kp
    on pd.kd_produk = kp.id
    inner join public.kode_satuans ks
    on pd.kd_satuan = ks.id
    where nama_produk iLike '%${nama_produk}%'
    `
}

query.getOneProduk = (id_produk) => {
    return `select pd.nama_produk,kp.kd_produk,pd.total_produk,pd.unassigned,pd.rak,ks.kd_satuan,pd.poto_produk
    from public.produks pd
    left join public.kode_produks kp
    on pd.kd_produk = kp.id
    inner join public.kode_satuans ks
    on pd.kd_satuan = ks.id
    where pd.id = ${id_produk}
    `
}


module.exports = query