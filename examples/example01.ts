import { R } from "../src/rtool"

const generator = R.Array(
    R.Object({
        dataType: "StockConsumption",
        header: {
            refId: R.Guid(),
            encounterId: R.Guid(),
            documentDate: R.Date("2024-03-01", "2024-03-04", "YYMMDD"),
            salesOrganization: R.AnyOf("ABC", "DEF", "GHI"),
            salesOffice: R.SameAs('salesOrganization').mappedInto({
                "ABC": "0101",
                "DEF": "0201",
                "GHI": "0301"
            }),
            distributionChannel: R.AnyOf("10", "20", "30"),
            division: R.AnyOf("01", "02", "03"),
            orderType: R.AnyOf("ZISC", "ZJSC"),
            customerPriceGroup: R.AnyOf("ZA", "ZB", "ZC", "ZD"),
            onsiteType: R.AnyOf("Z1", "Z2"),
            customer: {
                soldTo: R.Between(1900000020, 1900000030).asString(),
                shipTo: R.SameAs(p => p.soldTo),
                billTo: R.Between(1900000020, 1900000030).asString(),
                payer: R.SameAs('billTo'),
            }
        },
        items: R.Array(
            R.Object({
                doctor: R.Between(1900000020, 1900000030).asString(),
                material: R.Between(1000000017, 1000000023).asString(),
                quantity: R.Between(1, 30),
                storageLocation: R.AnyOf("A001", "A002", "A000"),
                batch: "000"
            })
        ).withLengthBetween(2, 5)
    })
).withLengthBetween(10, 10)


const generatedData = generator.generate()

console.log(generatedData)