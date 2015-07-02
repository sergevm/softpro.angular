using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Data.Projects
{
    public class Project
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CompanyId { get;set; }
    }
}