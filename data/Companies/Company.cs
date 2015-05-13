using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace data.Companies
{
	public class Company
	{
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }
		
		public string Name { get; set; }
		
		public string Vat { get; set; }
	}
}