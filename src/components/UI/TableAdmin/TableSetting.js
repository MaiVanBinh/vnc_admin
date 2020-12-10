const tabelSetting = {
  species: {
    title: "Loài",
    columnTitle: [
      "Id",
      "Tên Việt Name",
      "Tên Tiếng Anh",
      "Giới Thiệu",
      "Người Tạo",
      "Ngày Tạo",
      "Người sửa",
      "Ngày sửa",
    ],
    objKey: [
      "id",
      "name_vn",
      "name_en",
      "description",
      "created_by_name",
      "created_at",
      "updated_by_name",
      "updated_at",
    ],
  },
  groups: {
    title: "Lớp",
    columnTitle: [
      "Id",
      "Tên Việt Name",
      "Tên Latin",
      "Loài",
      "Người tạo",
      "Ngày Tạo",
      "Người Sửa",
      "Ngày Sửa",
    ],
    objKey: [
      "id",
      "name_vn",
      "name_latin",
      "species_name",
      "created_by_name",
      "created_at",
      "updated_by_name",
      "updated_at",
    ],
    dataType: ['number', 'text', 'text', 'text', 'number', 'date', 'number', 'date']
  },
  orders: {
    title: "Bộ",
    columnTitle: [
      "Id",
      "Tên Việt Name",
      "Tên Latin",
      "Lớp",
      "Người tạo",
      "Ngày Tạo",
      "Người Sửa",
      "Ngày Sửa",
    ],
    objKey: [
      "id",
      "name_vn",
      "name_latin",
      "group",
      "created_by",
      "created_at",
      "updated_by",
      "updated_at",
    ],
    dataType: ['number', 'text', 'text', 'text', 'number', 'date', 'number', 'date']
  },
  families: {
    title: "Họ",
    columnTitle: [
      "Id",
      "Tên Việt Name",
      "Tên Latin",
      "Bộ",
      "Người tạo",
      "Ngày Tạo",
      "Người Sửa",
      "Ngày Sửa",
    ],
    objKey: [
      "id",
      "name_vn",
      "name_latin",
      "order",
      "created_by",
      "created_at",
      "updated_by",
      "updated_at",
    ],
    dataType: ['number', 'text', 'text', 'text', 'number', 'date', 'number', 'date']
  },
};

export default tabelSetting;