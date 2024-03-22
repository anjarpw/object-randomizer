"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rtool_1 = require("../rtool");
const generator = rtool_1.R.Array(rtool_1.R.Object({
    dataType: "StockConsumption",
    header: {
        refId: rtool_1.R.Guid(),
        encounterId: rtool_1.R.Guid(),
        documentDate: rtool_1.R.Date("2024-03-01", "2024-03-04", "YYMMDD"),
        salesOrganization: rtool_1.R.AnyOf("ABC", "DEF", "GHI"),
        salesOffice: rtool_1.R.SameAs('salesOrganization').mappedInto({
            "ABC": "0101",
            "DEF": "0201",
            "GHI": "0301"
        }),
        distributionChannel: rtool_1.R.AnyOf("10", "20", "30"),
        division: rtool_1.R.AnyOf("01", "02", "03"),
        orderType: rtool_1.R.AnyOf("ZISC", "ZJSC"),
        customerPriceGroup: rtool_1.R.AnyOf("ZA", "ZB", "ZC", "ZD"),
        onsiteType: rtool_1.R.AnyOf("Z1", "Z2"),
        customer: {
            soldTo: rtool_1.R.Between(1900000020, 1900000030).asString(),
            shipTo: rtool_1.R.SameAs(p => p.soldTo),
            billTo: rtool_1.R.Between(1900000020, 1900000030).asString(),
            payer: rtool_1.R.SameAs('billTo'),
        }
    },
    items: rtool_1.R.Array(rtool_1.R.Object({
        doctor: rtool_1.R.Between(1900000020, 1900000030).asString(),
        material: rtool_1.R.Between(1000000017, 1000000023).asString(),
        quantity: rtool_1.R.Between(1, 30),
        storageLocation: rtool_1.R.AnyOf("A001", "A002", "A000"),
        batch: "000"
    })).withLengthBetween(2, 5)
})).withLengthBetween(10, 10);
const generatedData = generator.generate();
console.log(generatedData);
